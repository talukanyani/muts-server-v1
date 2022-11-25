const { checkEmailDuplication } = require('../models/models')

const checkEmailDup = (req, res, next) => {
    var reqdetails = req.body
    var table = 'portfolio_messages'

    checkEmailDuplication(reqdetails, table, (dbError, dbInfo) => {
        if (dbError) {
            next(new Error(dbError))
            return
        }

        if (dbInfo == 0) {
            next()
        } else {
            res.json({
                "type": "rejected",
                "title": "Already Sent",
                "message": "I already received your message, I will contact you back as soon as I see it.",
                "dbInfo": dbInfo,
            })
        }
    })
}

module.exports = checkEmailDup