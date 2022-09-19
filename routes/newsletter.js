const express = require('express')
const { subscribe } = require('../models/db')

const app = express()
const router = express.Router()

const onDevelopment = app.get('env') == 'development'

router.post('/', (req, res) => {
    var email = req.body.email

    subscribe(email, (dbError, info) => {
        if (dbError) {
            if (dbError.errno === 1062) {
                res.json({
                    "status": "Already Submitted",
                    "Email": email
                })
            } else {
                res.sendStatus(500)
                onDevelopment && console.log(dbError)
            }

            return
        }

        res.json({
            "Status": "Successfully Subscribed",
            "Email": email
        })
    })
})

module.exports = router
