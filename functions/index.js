const functions = require('firebase-functions');
const cors = require("cors")({
  origin: true
});
const nodemailer = require('nodemailer');
// REMEMBER: Create the file below yourself if you cloned from github repo!
const config = require('./config.js')



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendMailToDCS = functions.https.onRequest((req, res) => {
    nodemailer.createTestAccount((err, account) => {
         let transporter = nodemailer.createTransport({
           host: 'zoliborz.atthost24.pl',
           port: 587,
           secure: false, // true for 465, false for other ports
           auth: {
               user: config.user, // generated ethereal user
               pass: config.pass // generated ethereal password
           },
           tls:{
               rejectUnauthorized: false
           }
         });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"prośba o spotkanie z Lokalnika" <LokalnikMail@warszawazoliborz.zhp.pl>', // sender address
            to: 'g.r.fisher.pl@gmail.com', // list of receivers
            subject: 'Hello world', // Subject line
            text: 'Hello world from Lokalnik!', // plain text body
            html: '<b>Hello world from Lokalnik!</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });

    })

})
