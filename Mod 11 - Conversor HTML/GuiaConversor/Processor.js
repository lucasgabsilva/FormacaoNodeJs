class Processor{
    static Process(data){
        var a = data.split("\r\n")
        var rows = []

        a.forEach( row => {
            //percorremos o array de strings as separando por vírgulas
            var arr = row.split(",")
            rows.push(arr)
        })
        return rows
    }
}

module.exports = Processor