const functions = require('firebase-functions');
const cors = require("cors")({
  origin: true
});
const nodemailer = require('nodemailer');
// REMEMBER: Create the file below yourself if you cloned from github repo!
const config = require('./config.js')
var bodyParser = require('body-parser');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// FIXME: improve the security !!!
let transporter = nodemailer.createTransport({
  host: config.host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.user, 
    pass: config.pass 
  },
  tls: {
    rejectUnauthorized: false
  }
});



exports.sendMailToDCS = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    
    if (req.method !== "POST") {
      return res.status(500).json({
        status: '500',
        didItWork: false,
        message: "GET methods not allowed!"
      });
    }

    // FIXME: Set some Custom auth (X-auth) headers via your Front-end client and prevent execution of setting transporter without it.


    ///////////////////////////////////////////
    //  Setup mail config (to, from, mail body etc.)
    let mailOptions = {
      from: config.from, // sender address
      to: config.exampleTo, // list of receivers
      subject: `Spotkanie z: ${req.body.sendersName} ${req.body.sendersSurname}`, // Subject line
      text: `${req.body.sendersName} ${req.body.sendersSurname} prosi o spotkanie. 
            Sprawa jest: ${req.body.appointImportancy}. 
            O której: ${req.body.appointTime}. 
            Na jak długo? ${req.body.appointDuration}. 
            ${req.body.appointMessage}.
            Kontakt do tej osoby: ${req.body.sendersEmail} .
            Jeśli nie jesteś w stanie spotkać się z tą osobą, lub chciałbyś zmienić szczegóły spotkania, koniecznie do niej/niego napisz! :)`, // plain text body
      html: `<p><strong>${req.body.sendersName} ${req.body.sendersSurname} </strong> prosi o spotkanie, oto szczegóły jego prośby: </p>
            <hr>
            <ul>
                <li>
                Jak ważna sprawa: <strong><u>${req.body.appointImportancy}</u></strong> 
                </li>
                <li>
                Propozycja godziny spotkania: <strong><u>${req.body.appointTime}</u></strong>
                </li>
                <li>
                Długość spotkania: <strong><u>${req.body.appointDuration}</u></strong> 
                </li>
            </ul>
            <p>${req.body.appointMessage}</p>
            <hr>
            <h3>Email do tej osoby: ${req.body.sendersEmail} </h3>
            <hr>
            <p>Jeśli nie jesteś w stanie spotkać się z tą osobą, lub chciałbyś zmienić szczegóły spotkania, koniecznie do niej/niego napisz! :) </p>
            ` // html body
    };

    //////////////////////////////////////////
    // Send mail, return http response (200 succes / 500 failure with message )
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(`Failure! ${error} `);
        res.status(500).json({
          status: '500',
          didItWork: false,
          message: `Niestety, nie udało się wysłać twojej wiadomości do komendanta :(. 
          Spróbuj ponownie za jakieś 5 minut, lub skontaktuj się z grzegorz.rybak@zhp.net.pl wysyłając mu poniższy kod błędu: "${error}"
            PS. pamiętaj proszę, że aplikacja jest nadal w fazie testów ;) `
        })
      }
      console.log('Succes! Message sent: %s', info.messageId);
      res.status(200).json({
        status: '200',
        didItWork: true,
        message: "Twoja wiadomość została pomyślnie wysłana do komendanta. Skontaktuje się z Tobą w przypadku, gdy podany przez Ciebie termin bedzię wymagał ewentualnych dopracowań"
      })
    });

  })
})

exports.sendConfirmationMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    if (req.method !== "POST") {
      return res.status(500).json({
        status: '500',
        didItWork: false,
		message: "GET methods not allowed!"
      });
    }

    // FIXME: Set some Custom auth (X-auth) headers via your Front-end client and prevent execution of setting transporter without it.

    ///////////////////////////////////////////
    //  Setup mail config (to, from, mail body etc.)
    let mailOptions = {
      from: config.from2, // sender address
      to: req.body.sendersEmail, // list of receivers
      subject: `Twoja prośba o spotkanie do komendanta`, // Subject line
      text: `Cześć ${req.body.sendersName}!
      ${req.body.message}
      Pozdrawiamy,
      - poczta automatyczna Lokalnika`, // plain text body
      html: `<p>Cześć ${req.body.sendersName}!</p>
      <p> ${req.body.message}</p>
      <p> Pozdrawiamy </p>
      <p> - poczta automatyczna Lokalnika </p>` // html body
    };
	
    //////////////////////////////////////////
    // Send mail, return http response (200 succes / 500 failure with message )
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(`Failure in callback mail! ${error}`);
        res.status(500).json({
          status: '500',
          didItWork: false,
          message: error
        })
      }
      console.log('Succes! Callback mail sent as well: %s', info.messageId);
      res.status(200).json({
        status: '200',
        didItWork: true,
        message: "Wiadomość zwrotna pomyślnie wysłana"
      })
    });

  })
})
