const express = require('express')
const { submitMessage } = require('../models/db')
const { sendEmail } = require('../middlewares/email')
const { validateMessage } = require('../middlewares/validate')

const router = express.Router()

router.post('/', validateMessage, (req, res) => {
    submitMessage(req.body, 'new_messages');

    sendEmail(req.body, 'Muts Website');

    res.sendStatus(200);
})

module.exports = router
