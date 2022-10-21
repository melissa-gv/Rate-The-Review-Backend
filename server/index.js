require('dotenv').config()
const express = require('express')

const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())

// eslint-disable-next-line prefer-destructuring
// const PORT = process.env.PORT
const PORT = 3000
const reviewsCntl = require('./controllers/reviewsCntl')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/businesses', (req, res) => {
  console.log('server request received!')
  reviewsCntl.getBusinesses(req, res)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
