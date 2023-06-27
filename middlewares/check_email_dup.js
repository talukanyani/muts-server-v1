const express = require('express')
const { checkEmailDuplication } = require('../models/models')

const app = express()

function checkEmailDup(req, res, next) {
    var { email } = req.body

    checkEmailDuplication(email, (dbError, dbResult) => {
        if (dbError) {
            next(new Error(dbError))
            return
        }

        const { rowCount } = dbResult

        if (rowCount === 0) {
            next()
        } else {
            if (app.get('env') === 'development') {
                console.log('Email Already Submitted')
            }

            res.sendStatus(200)
        }
    })
}

module.exports = checkEmailDup
