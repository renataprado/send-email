require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 5000;
const name = process.env.NAME 

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
  next();
})

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.post('/email', (req, res, ) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  console.log(req.body);
  res.status(200).json({
    message: 'sucessfull post',
    email: req.body
  })
});


app.post('/send', (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;

   sendingEmail(email, nome, mensagem)
        .then(response => res.status(200).json(response))
        .catch(error => res.json(error));
})



const sendingEmail = (email, nome, mensagem) => {
  let transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
       user: process.env.GM, 
       pass: process.env.GMPASS  
     } 
    });
  
    const mailOptions = {
      from: email, // sender address
      to: 'dev.renataprado@gmail.com', // receiver (use array of string for a list)
      subject: `${nome} te enviou uma mensagem! ${email} `,
      text: mensagem,
    };

    
    return transporter.sendMail(mailOptions)

    transporter.sendMail(mailOptions, (err, info) => {
      if(err)
        console.log(err)
      else
        console.log(info);
   });

}

app.listen(port, () => console.log(`Hello ${name}, Listening on port ${port}`));
