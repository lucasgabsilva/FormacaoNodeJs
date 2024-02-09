var appointment = require("../models/Appointment")
var mongoose = require("mongoose")
var AppointmentFactory = require("../factories/AppointmentFactory")
const nodemailer = require('nodemailer');

const Appo = mongoose.model("Appointment",appointment)

class AppointmentService {
    async create(name, email, description,cpf,date,time){
        var newAppo = new Appo({
        
           
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
            
        }) 
        try{
            await newAppo.save()
            return true
        }catch(err){
            console.log(err)
            return false
        } 
    }
        async GetAll(showFinished){
            if(showFinished){
                return await Appo.find()
            }else{
                var appos = await Appo.find({'finished': false})
                var appointments = []

                appos.forEach(appointment => {
                    if (appointment.date != undefined){
                       appointments.push(AppointmentFactory.Build(appointment)) 
                    }
                })
                return appointments;
            }
        }
        async GetById(id){
            try{
                var event = await Appo.findOne({'_id': id})
                return event
            }catch(err){
                console.log(err)
            }  
        }
        async Finish(id){
            try{
                Appo.findByIdAndUpdate(id,{finished: true})
                return true
            }catch(err){
                console.log(err)
                return false
            }
        }
        async Search(query){
            try{
                var appos = await Appo.find().or([{email: query}],[{cpf: query}])
                return appos
            }catch(err){
                console.log(err)
                return []
            } 
        }
        async SendNotification(){
            var appos =  await this.GetAll(false)

            var transporter = nodemailer.createTransport ({
                host: "sandbox.smtp.mailtrap.io",
                port: 25,
                auth: {
                    user: "8328077e361749",
                    pass: "dfa04a5352cf72"
                }
            })
            
            appos.forEach( async app => {
                var date = app.start.getTime()
                var hour = 1000 * 60 * 60
                var gap = date - Date.now()

                if(gap <= hour){

                    await Appo.findByIdAndUpdate(app.id,{notified:true})

                    if(!app.notified){
                        transporter.sendMail({
                            from: "Lucas <lucas@guia.com.br>",
                            to: app.email,
                            subject: `Consulta sr(a) ${app.name}`,
                            text: `Olá sr(a) ${app.name}! viemos por meio desta informar que sua consulta está marcada para hoje, caso não possa comparecer, favor entrar em contato.`
                        }).then(() => {

                        }).catch(err => {

                        })
                    }
                }
            })
        }
    } 

module.exports = new AppointmentService()