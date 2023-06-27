const db = require('./db')

function submitEmail(email, result) {
    const sqlQuery = 'INSERT INTO mailing_list (email) VALUES($1)'
    const values = [email]

    db(sqlQuery, values, result)
}

function checkEmailDuplication(email, result) {
    const query = 'SELECT id FROM mailing_list WHERE email = $1';
    const values = [email]

    db(query, values, result)
}

function submitMessage(reqBody, table, result) {
    const { name, email, text } = reqBody

    const query = `INSERT INTO ${table} (name, email, text) VALUES($1, $2, $3)`
    const values = [name, email, text]

    db(query, values, result)
}

module.exports = { submitEmail, checkEmailDuplication, submitMessage }
