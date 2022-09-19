const mysql = require('mysql')
const dbConfig = require('../config/dbConfig')

const connection = mysql.createConnection(dbConfig)

const subscribe = (email, result) => {
    var sqlQuery = `INSERT INTO newsletter_emails (email) VALUES('${email}')`

    connection.query(sqlQuery, (error, info) => {
        if (error) {
            result(error)
            return
        }

        result(null, info)
    })
}

const emailSubmit = (email, result) => {
    var sqlQuery = `INSERT INTO sc_emails (email) VALUES('${email}')`

    connection.query(sqlQuery, (error, info) => {
        if (error) {
            result(error)
            return
        }

        result(null, info)
    })
}

module.exports = { subscribe, emailSubmit }

