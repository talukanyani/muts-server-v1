const express = require('express')
const { submitEmail } = require('../models/models')
const { validateEmail } = require('../middlewares/validate')
const checkEmailDup = require('../middlewares/check_email_dup')

const app = express()

const router = express.Router()

const middlewares = [validateEmail, checkEmailDup]

router.post('/', middlewares, (req, res, next) => {
    const { email } = req.body

    submitEmail(email, (dbError, dbResult) => {
        if (dbError) {
            next(new Error(dbError))
            return
        }

        res.sendStatus(200);

        if (app.get('env') === 'development') console.log(dbResult);
    })
})

module.exports = router
