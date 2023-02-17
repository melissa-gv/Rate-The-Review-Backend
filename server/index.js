require('dotenv').config()
const express = require('express')

const app = express()
const path = require('path')
// const cors = require('cors')

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const { PORT } = process.env
const REVIEWS_CNTL = require('./controllers/reviewsCntl')
const USERS_CNTL = require('./controllers/usersCntl')

app.get('/test', (req, res) => {
  console.log('test server request received!')
  res.send('test endpoint reached')
})

app.get('/businesses', (req, res) => {
  console.log('Businesses server request received!')
  REVIEWS_CNTL.getBusinesses(req, res)
})

app.post('/auth', (req, res) => {
  console.log('auth server request received!')
  USERS_CNTL.upsertUserCntl(req, res)
})

app.post('/results', (req, res) => {
  console.log('game results server request received!')
  USERS_CNTL.addGameEntry(req, res)
})

// FIXME change path name
app.get('/getTopScores', (req, res) => {
  console.log('getTopScores server request received!')
  USERS_CNTL.getTopScoresCntl(req, res)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
