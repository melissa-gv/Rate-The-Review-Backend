// const db = require("../database/index.js");


// exports.createOne = ({ title, content, summary, status, image_id }) => {
//   var queryString = `INSERT INTO posts (title, content, summary, status, imageID) VALUES ('${title}', '${content}', '${summary}', '${status}', '${image_id}')`;
//   return db.queryAsync(queryString)
//   .then((queryResult) => {
//     return queryResult
//     console.log('DB Result from createOne:', queryResult)
//   })
//   .catch(err => {
//     console.log('Error inserting into DB:', err)
//   });
//   // throw Error("Method not implemented")
// };

// exports.findAll = () => {
//   var queryString = `SELECT * FROM posts ORDER BY created_at DESC`;
//   return db.queryAsync(queryString).spread(results => results)
//   .then((queryResult) => {
//     console.log('DB Result from findAll:', queryResult)
//     return queryResult
//   })
//   .catch(err => {
//     console.log('Error finding into DB:', err)
//   })
// };

// exports.findByID = (id) => {
//   var queryString = `SELECT * FROM posts WHERE id = '${id}'`;
//   return db.queryAsync(queryString).spread(results => results)
//   .then((queryResult) => {
//     console.log('DB Result from findByID:', queryResult)
//     return queryResult
//   })
//   .catch(err => {
//     console.log('Error finding into DB:', err)
//   })
// };

// exports.incrementViewByID = (id) => {

//   // TODO: Implement this method.
//   // Update the function's arguments if you'd like to switch
//   // to a callback-based implementation.
//   throw Error("Method not implemented")
// };

// exports.toggleStatusByID = (id) => {

//   // TODO: Implement this method.
//   // Update the function's arguments if you'd like to switch
//   // to a callback-based implementation.
//   throw Error("Method not implemented")
// };

// exports.deleteByID = (id) => {

//   // TODO: Implement this method.
//   // Update the function's arguments if you'd like to switch
//   // to a callback-based implementation.
//   throw Error("Method not implemented")
// };

// exports.deleteAll = () => {
//   return db.queryAsync(`TRUNCATE posts`).catch((err) => console.log(err));
// };
