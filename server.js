const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: '*',
    Credentials: true,
    optionSucessStatus: 200
}))

app.get('/', (req, res) => {
    res.json({ "status": "The server is working" })
})

app.listen(3001, () => {
    console.log('The server is runnimg on port 3001');
})