const express = require('express')
const cors = require('cors')

const newsletter = require('./routes/newsletter')
const scNewsletter = require('./routes/sc-newsletter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3001',
    Credentials: true,
    optionSucessStatus: 200
}))

app.use('/newsletter', newsletter)
app.use('/sc/notify_me', scNewsletter)

var date = new Date()

console.log(date.getTime())
const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})