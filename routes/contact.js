const express = require('express')
const { send } = require('../models/db')

const app = express()
const router = express.Router()

const onDevelopment = app.get('env') == 'development'

router.post('/', (req, res) => {
    var message = req.body

    send(message, (dbError, info) => {
        if (dbError) {
            if (dbError.errno = 1062) {
                res.json({
                    "status": dbError.errno
                })
            } else {
                res.sendStatus(500)
                onDevelopment && console.log(dbError)
            }

            return
        }

        res.json({
            "status": info.affectedRows
        })
    })
})

module.exports = router