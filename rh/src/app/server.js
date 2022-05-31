const express = require("express");

const nodemailer = require("nodemailer");

const app = express();

const port = 3000;

app.use(express.json());

app.post(`/sendinformatica`, (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pbprev.setor.dinf.siscrh@gmail.com",
      pass: "Siscrh2020",
    },
  });

  const mailOptions = {
    from: "pbprev.setor.dinf.siscrh@gmail.com", // sender address
    to: "sabrina.topel@pbprev.pb.gov.br", // list of receivers
    subject: "Atenção! SISCOGEP Informa!", // Subject line
    html:
      "Temos um novo membro na PBprev! <br>  Por gentileza, criar conta no nosso sistema com as seguintes informações: <br>" +
      "<br> Nome Completo: " + req.body.name  +
       " <br> Setor: " + req.body.setor  +
      " <br> Cargo: " + req.body.cargo  
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
 
});

app.post(`/sendrh`, (req, res) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pbprev.setor.dinf.siscrh@gmail.com",
        pass: "Siscrh2020",
      },
    });
  
    const mailOptions = {
      from: "pbprev.setor.dinf.siscrh@gmail.com", // sender address
      to: "sabrina.topel@pbprev.pb.gov.br", // list of receivers
      subject: "Atenção! SISCOGEP Informa!", // Subject line
      html:
        `O usuário do(a) colaborador(a), ${req.body.name}, está disponível no sistema! <br>`  +
        "<br> Nome Completo: " + req.body.name  +
        "<br> Setor: " + req.body.setor  +
        "<br> Cargo: " + req.body.cargo  
    };
  
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
   
  });

app.listen(port, () => console.log(`running port ${port}`));
