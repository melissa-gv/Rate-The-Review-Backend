// const mongoose = require('mongoose')

// const { DBHOST } = process.env
// const { DBPORT } = process.env

// mongoose.connect(`mongodb://${DBHOST}/${DBPORT}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// const UserSchema = new mongoose.Schema({
//   userInfo: {
//     firstName: String,
//     lastName: String,
//     email: {
//       type: String,
//       unique: true,
//     },
//     password: String,
//   },
//   // games: [GameSchema],
//   accountCreateDate: {
//     type: Date,
//     default: Date.now,
//   },
// })

// // const GameSchema = new mongoose.Schema({
// //   date: Date,
// //   score: Number,
// //   zipcode: Number
// // })

// // mongoose.model(modelName, schema)
// const UserInfo = mongoose.model('UserInfo', UserSchema)

// // let save = (repos) => {
// //   // TODO: Your code here
// //   // This function should save a repo or repos to
// //   // the MongoDB

// //   // Using create - Joseph solution
// //   // should use .create when possible
// //   return Repo.create(repos)
// //     .then((result) => {
// //       console.log('Data added to DB!')
// //     })
// //     .catch((err) => {
// //       console.log('Error saving repos to DB:', err)
// //     })

// //   // Promises - Joseph solution 2
// //   // return Promise.all(repos.map(repo => {
// //   //   return new Repo(repo).save()
// //   // }))

// //    // Using map - Tosin's solution
// //     // let reposToInsert = repos.map(repo => {
// //     //   let databaseRepos = {
// //     //     repo_id: repo.id,
// //     //     name: repo.name,
// //     //     description: repo.description,
// //     //     owner: repo.owner.login,
// //     //     stargazers_count: repo.stargazers_count,
// //     //     created_at: repo.created_at
// //     //   }
// //     // })
// //     // Repo.insertMany(reposToInsert);
// // }

// // let getAll = () => {
// //   return Repo.find({})
// //     .sort('stargazers_count')
// //     .limit(25)
// //     .exec()
// // }

// module.exports.UserInfo = UserInfo
// // module.exports.save = save;
// // module.exports.getAll = getAll;
