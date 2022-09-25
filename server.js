const express = require('express')
const cors = require('cors')

const newsletter = require('./routes/newsletter')
const scNewsletter = require('./routes/sc-newsletter')
const contact = require('./routes/contact')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3000',
    Credentials: true,
    optionSucessStatus: 200
}))

app.use('/newsletter', newsletter)
app.use('/sc/notify_me', scNewsletter)
app.use('/contact', contact)

app.use((req, res) => {
    res.sendStatus(404)
})

const onDevelopment = app.get('env') == 'development'

app.use((error, req, res, next) => {
    onDevelopment && console.error(error)
    res.sendStatus(500)
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})