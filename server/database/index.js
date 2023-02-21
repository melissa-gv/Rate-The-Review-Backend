const mongoose = require('mongoose')

const { DBHOST } = process.env
const { DBPORT } = process.env
const { DBNAME } = process.env

mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const GAME_SCHEMA = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  location: String,
  score: Number,
  restaurants: Array,

})

const USER_SCHEMA = new mongoose.Schema({
  uid: String,
  username: String,
  email: String,
  cookie: String,
  accountCreateDate: {
    type: Date,
    default: Date.now,
  },
  games: [GAME_SCHEMA],
})

const UserModel = mongoose.model('UserModel', USER_SCHEMA)

module.exports.UserModel = UserModel
