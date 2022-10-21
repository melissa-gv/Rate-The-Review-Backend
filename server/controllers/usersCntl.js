const axios = require('axios').default;
const Post = require("../models/reviewsModel.js");

exports.getPosts = (req, res) => {
  Post.findAll()
  .then((dbResponse) => {
    console.log('findAll DB response:', dbResponse)
    res.send(dbResponse)
  })
  .catch(err => {
    console.log('err in DB findAll:', err)
    res.sendStatus(501)
  })
};

exports.getPost = (req, res) => {
  console.log('getPost data:', req.params.id)
  Post.findByID(req.params.id)
  .then((dbResponse) => {
    console.log('findByID DB response:', dbResponse)
    res.send(dbResponse)
  })
  .catch(err => {
    console.log('err in DB findByID:', err)
    res.sendStatus(501)
  })
};
