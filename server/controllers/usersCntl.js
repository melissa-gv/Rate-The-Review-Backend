const USERS_MODEL = require('../models/usersModel')

module.exports = {
  upsertUserCntl: (req, res) => {
    console.log('req.body.params:', req.body.params)
    return USERS_MODEL.upsertUser(req.body.params)
      .then((response) => {
        console.log('upsertUserCntl response:', response)
        res.status(201).send(response)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  },
  addGameEntry: (req, res) => {
    console.log('req.body.params:', req.body.params)
    return USERS_MODEL.addGameEntryMdl(req.body.params)
      .then((response) => {
        console.log('addGameEntryMdl response:', response)
        res.status(201).send(response)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  },
  getTopScoresCntl: (req, res) => USERS_MODEL.getTopScoresMdl()
    .then((response) => {
      console.log('getTopScoresMdl response:', response)
      res.status(201).send(response)
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    }),
}
