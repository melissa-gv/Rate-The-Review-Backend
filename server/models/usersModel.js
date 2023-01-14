const DB = require('../database/index')

module.exports = {
  upsertUser: (user) => {
    const filter = { username: user.username }
    const update = user
    return DB.UserModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    })
  },
  addGameEntryMdl: (gameData) => {
    const filter = { username: gameData.username }
    const update = {
      zipcode: gameData.zipcode,
      score: gameData.score,
      restaurants: gameData.restaurants,
    }
    return DB.UserModel.findOneAndUpdate(filter, { $push: { games: update } }, {
      new: true,
      upsert: true,
    })
  },
  // eslint-disable-next-line arrow-body-style
  getTopScoresMdl: () => {
    return DB.UserModel.aggregate([
      {
        $project: {
          _id: 0,
          username: 1,
          'games._id': 1,
          'games.score': 1,
          'games.date': 1,
          'games.restaurants.name': 1,
        },
      },
      { $unwind: '$games' },
      { $unwind: '$games.score' },
      { $sort: { 'games.score': -1 } },
      { $limit: 10 },
    ])
  },
}
