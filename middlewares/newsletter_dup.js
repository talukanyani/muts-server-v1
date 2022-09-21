const { checkEmailDuplication } = require('../models/models')

const checkEmailDup = (req, res, next) => {
    var reqdetails = req.body
    var table = 'newsletter_emails'

    checkEmailDuplication(reqdetails, table, (dbError, dbInfo) => {
        if (dbError) {
            res.sendStatus(500)
            return
        }

        if (dbInfo == 0) {
            next()
        } else {
            res.json({ "status": "already_subscribed" })
        }
    })
}

module.exports = checkEmailDup

