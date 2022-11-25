const express = require('express')

const { send } = require('../models/models')
const { sendEmail } = require('../middlewares/email')
const { validateMssg, validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/port_message_dup')

const router = express.Router()

const middlewares = [validateMssg, validateEmail, checkEmailDup]

const onDevelopment = express().get('env') == 'development'

router.post('/contact', middlewares, (req, res, next) => {
    var reqdetails = req.body
    var table = 'portfolio_messages'

    send(reqdetails, table, (dbError, info) => {
        if (dbError) {
            next(new Error(dbError))
            onDevelopment && console.log(dbError)
            return
        }

        sendEmail('Portfolio', reqdetails)

        res.json({
            "type": "success",
            "title": "Successfully Sent",
            "message": `I have recevied your message, I will contact you back on ${reqdetails.email}`
        })

        onDevelopment && console.log(info)
    })
})

module.exports = router