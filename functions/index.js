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
        
        let transporter = nodemailer.createTransport({
            host: config.host,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.user, // generated ethereal user
                pass: config.pass // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: config.from, // sender address
            to: config.exampleTo, // list of receivers
            subject: 'Hello world', // Subject line
            text: `Nowy Użytkownik o mailu ${req.body.sendersEmail}`, // plain text body
            html: `<p><strong>${req.body.sendersName} ${req.body.sendersSurname} </strong> prosi o spotkanie na dyżurze hufca, oto szczegóły jego prośby: </p>
            <hr>
            <ul>
                <li>Jak ważna sprawa: ${req.body.appointImportancy}</li>
                <li>Propozycja godziny spotkania: ${req.body.appointTime}</li>
                <li>Długość spotkania: ${req.body.appointDuration}</li>
            </ul>
            <p>${req.body.appointMessage}</p>
            <hr>
            <h5>Email do tej osoby: ${req.body.sendersEmail} </h5>
            <p>Jeśli nie jesteś w stanie spotkać się z tą osobą, lub chciałbyś zmienić szczegóły spotkania, koniecznie do niej/niego napisz! :) </p>
            ` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
                res.status(500).json({
                    status:'500',
                    didItWork: false,
                    message: error
                })
            }
            console.log('Message sent: %s', info.messageId);
            res.status(200).json({
                status: '200',
                didItWork: true,
                message: "Twoja wiadomość została pomyślnie wysłana do komendanta"
            })
        });
    })
})
