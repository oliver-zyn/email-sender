require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()

const PORT = 3000

const user = process.env.USER       //Email de quem enviará
const pass = process.env.PASS       //Senha de quem enviará

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/send', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
    })

    transporter.sendMail({
        from: user,                                             //Quem irá enviar o email
        to: 'emaildesejado@gmail.com',                          //Quem irá receber o email
        subjetc: 'Email teste',                                 //Assunto do email
        html: '<h1>Olá, esse é um email eviado pelo node!</h1>' //Conteúdo do email (pode ser escrito em HTML)
    }).then(info => {
        res.send(info)
    }).catch(error => {
        res.send(error)
    })
})

app.listen(PORT, () => console.log('Running on port', PORT))