const express = require('express')
const { submitEmail } = require('../models/db')
const { validateEmail } = require('../middlewares/validate')

const router = express.Router()

router.post('/', validateEmail, (req, res) => {
    const { email } = req.body

    submitEmail(email);

    res.sendStatus(200);
})

module.exports = router
