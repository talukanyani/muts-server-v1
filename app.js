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

const mutsCors = {
  origin: 'https://muts.dev',
  methods: 'POST',
  Credentials: true,
}

const portfolioCors = {
  origin: 'https://talu-m.web.app',
  methods: 'POST',
  Credentials: true,
}

app.use(cors(mutsCors))

app.use('/contact', contact)
app.use('/mailing_list', mailingList)
app.use(
  '/api/v1/talukanyani/portfolio',
  cors(portfolioCors),
  portfolio
)

app.use((req, res) => {
  res.redirect(`https://muts.dev/${req.path}`)
});

// error handler
app.use((error, req, res, next) => {
  if (app.get('env') === 'development') console.log(error)
  res.sendStatus(error.status || 500)
});

module.exports = app;
