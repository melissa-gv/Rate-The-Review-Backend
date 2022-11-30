/* eslint-disable no-use-before-define */
const axios = require('axios')
// const reviewsModel = require('../models/reviewsModel')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const YELP_URL = 'https://api.yelp.com/v3'
const { API_KEY } = process.env

const getBusinesses = (req, res) => {
  const offsetNum = Math.floor(Math.random() * 1000)
  console.log('offsetNum:', offsetNum)
  axios.get(`${YELP_URL}/businesses/search`, {
    headers: { Authorization: `${API_KEY}` },
    params: {
      term: 'restaurants',
      location: req.query.location,
      radius: 10000,
      limit: 6,
      offset: offsetNum,
    },
  })
    .then((businessesResponse) => {
      getReviews(req, res, businessesResponse.data.businesses)
      console.log('0 Business Name:', businessesResponse.data.businesses[0].name)
      console.log('1 Business Name:', businessesResponse.data.businesses[1].name)
      console.log('2 Business Name:', businessesResponse.data.businesses[2].name)
      console.log('3 Business Name:', businessesResponse.data.businesses[3].name)
      console.log('4 Business Name:', businessesResponse.data.businesses[4].name)
      console.log('5 Business Name:', businessesResponse.data.businesses[5].name)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

const getReviews = (req, res, businesses) => {
  const reviews = []

  Promise.allSettled(businesses.map((business) => axios.get(business.url, {
    headers: { Authorization: `${API_KEY}` },
  })
    .then((reviewsResponse) => {
      const dom = new JSDOM(reviewsResponse.data)
      const rating1 = Number(dom.window.document.getElementById('reviews').querySelectorAll('.five-stars--regular__09f24__DgBNj')[0].attributes['aria-label'].textContent.substring(0, 1))
      const rating2 = Number(dom.window.document.getElementById('reviews').querySelectorAll('.five-stars--regular__09f24__DgBNj')[1].attributes['aria-label'].textContent.substring(0, 1))
      const reviewText1 = dom.window.document.getElementById('reviews').querySelectorAll('.comment__09f24__gu0rG')[0].textContent
      const reviewText2 = dom.window.document.getElementById('reviews').querySelectorAll('.comment__09f24__gu0rG')[1].textContent
      reviews.push(
        { rating: rating1, reviewText: reviewText1 },
        { rating: rating2, reviewText: reviewText2 },
      )
      console.log('reviews.length:', reviews.length)
    })))
    .then(() => {
      console.log('FINAL DATA TO BE SENT:', reviews, businesses)
      res.status(200).send({ reviews, businesses })
    })
    .catch((err) => {
      console.log('err:', err)
    })
}

module.exports.getBusinesses = getBusinesses
module.exports.getReviews = getReviews
