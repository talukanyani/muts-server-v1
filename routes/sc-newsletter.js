const express = require('express')

const { emailSubmit } = require('../models/models')
const { validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/sc_email_dup')

const router = express.Router()

const onDevelopment = express().get('env') == 'development'

router.post('/', validateEmail, checkEmailDup, (req, res) => {
    var reqdetails = req.body

    emailSubmit(reqdetails, (dbError, dbInfo) => {
        if (dbError) {
            res.sendStatus(500)
            onDevelopment && console.log(dbError)
            return
        }

        res.json({
            "message": "successfully_submitted",
            "email": req.body.email
        })
        onDevelopment && console.log(dbInfo)
    })
})

module.exports = router