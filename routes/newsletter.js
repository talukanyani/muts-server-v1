const express = require('express')

const { subscribe, unsubscribe } = require('../models/models')
const { validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/newsletter_dup')

const router = express.Router()

const onDevelopment = express().get('env') == 'development'

router.post('/', validateEmail, checkEmailDup, (req, res) => {
    var reqdetails = req.body

    subscribe(reqdetails, (dbError, dbInfo) => {
        if (dbError) {
            res.sendStatus(500)
            onDevelopment && console.log(dbError)
            return
        }

        res.json({
            "message": "successfully_subscribed",
            "email": req.body.email
        })
        onDevelopment && console.log(dbInfo)
    })
})

router.delete('/', (req, res) => {
    var reqdetails = req.body

    unsubscribe(reqdetails, (dbError, dbInfo) => {
        if (dbError) {
            res.sendStatus(500)
            onDevelopment && console.log(dbError)
            return
        }

        if (dbInfo.affectedRows == 0) {
            res.sendStatus(404)
            onDevelopment && console.log(dbInfo)
            return
        }

        res.json({
            "message": "successfully_unsubscribed",
            "email": req.body.email
        })
        onDevelopment && console.log(dbInfo)
    })
})

module.exports = router
