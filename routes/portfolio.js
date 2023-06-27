const express = require('express')
const { submitMessage } = require('../models/models')
const { sendEmail } = require('../middlewares/email')
const { validateMessage, validateEmail } = require('../middlewares/validate')

const app = express()

const router = express.Router()

const middlewares = [validateMessage, validateEmail]

router.post('/contact', middlewares, (req, res, next) => {
    const reqBody = req.body
    const sqlTable = 'portfolio_messages'

    submitMessage(reqBody, sqlTable, (dbError, dbResult) => {
        if (dbError) {
            next(new Error(dbError))
            return
        }

        sendEmail('Portfolio', reqBody)

        res.sendStatus(200);

        if (app.get('env') === 'development') console.log(dbResult);
    })
})

module.exports = router
