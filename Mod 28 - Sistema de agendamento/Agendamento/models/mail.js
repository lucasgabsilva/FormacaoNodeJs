const nodemailer = require('nodemailer');
var appointment = require("../models/Appointment")
var mongoose = require("mongoose")
var AppointmentFactory = require("../factories/AppointmentFactory")


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lcstrading.smc@gmail.com",
    pass: 'ijeu pvoy kkfk gkdu',
  },
});

const mailOptions = {
  from: 'lcstrading.smc@gmail.com',
  to: app.email,
  subject: `Consulta sr(a) ${app.name}`,
  text: `Olá sr(a) ${app.name}! viemos por meio desta informar que sua consulta está marcada para hoje, caso não possa comparecer, favor entrar em contato.`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('E-mail enviado: ' + info.response);
  }
});



