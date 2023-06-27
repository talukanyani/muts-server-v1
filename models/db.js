const express = require('express')
const { Pool } = require('pg')
const { devDbConfig, prodDbConfig } = require('../config/db')

const app = express()

const dbConfig = (app.get('env') === 'development') ? devDbConfig : prodDbConfig

const pool = new Pool(dbConfig)

function db(query, values, result) {
    pool.query(query, values, (error, info) => {
        if (error) {
            result(error, null)
            return
        }

        result(null, info)
    })
}

module.exports = db
