const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mailingList = require('./routes/mailing_list')
const contact = require('./routes/contact')
const portfolio = require('./routes/portfolio')

const app = express()

app.set('env', 'development')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(helmet())

const portfolioCors = {
  origin: 'https://talukanyani.github.io',
  methods: 'POST',
  Credentials: true,
}

app.use('/contact', contact)
app.use('/api/mailing_list', mailingList)
app.use('/api/talukanyani/portfolio', cors(portfolioCors), portfolio)

app.use(express.static(`${__dirname}/client/build`))

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
});

// 404 handler
app.use((req, res, next) => {
  res.sendStatus(404)
});

// error handler
app.use((error, req, res, next) => {
  if (app.get('env') === 'development') console.log(error)
  res.status(error.status || 500)
  res.send('Something went wrong')
});

module.exports = app;
