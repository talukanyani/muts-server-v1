const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/emailConfig')

const sendEmail = (origin, reqdetails) => {
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
        from: '"Tmlab" tmlab.tech@outlook.com',
        to: 'tmutshaeni@hotmail.com, 219055590@student.uj.ac.za',
        subject: `New Message From ${origin}`,
        text: 'Hello world? talu',
        html: `
        <!DOCTYPE html>
          <html lang="en">
            <body>
              <h1>New Message from ${origin}<h1>
              <ul>
                <li>SenderName: ${reqdetails.name}</li>
                <li>SenderEmail: ${reqdetails.email}</li>
              </ul>
              <p>${reqdetails.text}</p>
            </body>
        </html>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return;
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}

module.exports = { sendEmail }