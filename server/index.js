require('dotenv').config()
const express = require('express')

const app = express()
const path = require('path')
const cors = require('cors')

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  }),
)

const cookieParser = require('cookie-parser')

const { PORT } = process.env
const REVIEWS_CNTL = require('./controllers/reviewsCntl')
const USERS_CNTL = require('./controllers/usersCntl')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.get('/businesses', (req, res) => {
  console.log('Businesses server request received!')
  REVIEWS_CNTL.getBusinesses(req, res)
})

app.post('/auth', (req, res) => {
  USERS_CNTL.upsertUserCntl(req, res)
  // res.cookie('rate-the-review-cookie', 'adfdsafasdfasdfsadf').send('cookie set')
  // console.log('req.cookies:', req.cookies)
})

app.put('/results', (req, res) => {
  USERS_CNTL.addGameEntry(req, res)
})

// FIXME change path name
app.get('/getTopScores', (req, res) => {
  USERS_CNTL.getTopScoresCntl(req, res)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
