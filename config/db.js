const devDbConfig = {
    host: 'localhost',
    user: 'testuser',
    password: 'testuser',
    database: 'testdb',
}

const prodDbConfig = {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
}

module.exports = { devDbConfig, prodDbConfig }
