const express = require('express')
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email')

const app = express()

function sendEmail(reqBody, origin) {
    const { senderName, senderEmail, messageBody } = reqBody;

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: emailConfig.email,
            pass: emailConfig.password,
        },
        tls: {
            ciphers: 'SSLv3'
        }
    })

    const mailOptions = {
        from: emailConfig.email,
        to: 'tmutshaeni@hotmail.com',
        subject: `New Message From ${origin}`,
        html: `
        <!DOCTYPE html>
          <html lang="en">
            <body>
              <h1>New Message from ${origin}<h1>
              <ul>
                <li>SenderName: ${senderName}</li>
                <li>SenderEmail: ${senderEmail}</li>
              </ul>
              <p>${messageBody}</p>
            </body>
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        const onDevelopment = (app.get('env') === 'development');

        if (error) {
            if (onDevelopment) console.log(error);
            return;
        }

        if (onDevelopment) {
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    });
}

module.exports = { sendEmail }
