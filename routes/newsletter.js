const express = require('express')
const { subscribe, unsubscribe } = require('../models/db')

const app = express()
const router = express.Router()

const onDevelopment = app.get('env') == 'development'

router.post('/', (req, res) => {
    var email = req.body.email

    subscribe(email, (dbError, info) => {
        if (dbError) {
            if (dbError.errno === 1062) {
                res.json({
                    "Status": "Already Submitted",
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

router.delete('/', (req, res) => {
    var id = req.body.id
    var email = req.body.email

    unsubscribe(id, (dbError, info) => {
        if (dbError) {
            res.sendStatus(500)
            onDevelopment && console.log(dbError)
            return
        }

        if (info.affectedRows == 0) {
            res.json({
                "Status": "Already Unsubscribed",
                "Email": email
            })
            return
        }

        res.json({
            "Status": "Successfully Unsubscribed",
            "Email": email
        })
    })
})

module.exports = router
