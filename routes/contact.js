const express = require('express')

const { send } = require('../models/models')
const { validateMssg, validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/contact_dup')

const router = express.Router()

const onDevelopment = express().get('env') == 'development'

const middlewares = [validateMssg, validateEmail, checkEmailDup]

router.post('/', middlewares, (req, res) => {
    var reqdetails = req.body

    send(reqdetails, (dbError, info) => {
        if (dbError) {
            res.sendStatus(500)
            onDevelopment && console.log(dbError)
            return
        }

        res.json({
            "message": "successfully_sent",
            "email": req.body.email
        })
        onDevelopment && console.log(info)
    })
})

module.exports = router