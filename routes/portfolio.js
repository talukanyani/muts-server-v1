const express = require('express')
const { submitMessage } = require('../models/db')
const { sendEmail } = require('../middlewares/email')
const { validateMessage } = require('../middlewares/validate')

const router = express.Router()

router.post('/contact', validateMessage, (req, res) => {
    submitMessage(req.body, 'portfolio_messages');

    sendEmail(req.body, 'Portfolio');

    res.sendStatus(200);
})

module.exports = router
