/* eslint-disable no-use-before-define */
const axios = require('axios')
// const reviewsModel = require('../models/reviewsModel')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const YELP_URL = 'https://api.yelp.com/v3'
const { API_KEY } = process.env

const getBusinesses = (req, res) => {
  axios.get(`${YELP_URL}/businesses/search`, {
    headers: { Authorization: `${API_KEY}` },
    params: {
      term: 'restaurants',
      location: req.query.location,
      radius: 10000,
      limit: 3,
    },
  })
    .then((businessesResponse) => {
      getReviews(req, res, businessesResponse.data.businesses)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

const getReviews = (req, res, businesses) => {
  const reviews = {}

  Promise.all(businesses.map((business, index) => axios.get(business.url, {
    headers: { Authorization: `${API_KEY}` },
  })
    .then((reviewsResponse) => {
      const dom = new JSDOM(reviewsResponse.data)
      const rating = Number(dom.window.document.getElementById('reviews').querySelector('.five-stars--regular__09f24__DgBNj').attributes['aria-label'].textContent.substring(0, 1))
      const reviewText = dom.window.document.getElementById('reviews').querySelector('.comment__09f24__gu0rG').textContent
      reviews[index] = { rating, reviewText }
    })))
    .then(() => {
      console.log('data to be sent:', { reviews, businesses })
      res.status(200).send({ reviews, businesses })
    })
    .catch((err) => {
      console.log('err:', err)
    })
}

module.exports.getBusinesses = getBusinesses
module.exports.getReviews = getReviews
