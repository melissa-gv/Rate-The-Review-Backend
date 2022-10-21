const axios = require('axios')
// const reviewsModel = require('../models/reviewsModel')

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
    .then((yelpBusinessesResponse) => {
      getReviews(req, res, yelpBusinessesResponse.data.businesses)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

getReviews = (req, res, businesses) => {
  const GetReviewsPromises = []
  const ReviewResponses = []

  axios.get(`${YELP_URL}/businesses/${businesses[0].id}/reviews`, {
    headers: { Authorization: `${API_KEY}` },
  })
    .then((response1) => {
      for (const review of response1.data.reviews) {
        ReviewResponses.push(review);
      }
    })
    .then(() => axios.get(`${YELP_URL}/businesses/${businesses[1].id}/reviews`, {
      headers: { Authorization: `${API_KEY}` },
    }))
    .then((response2) => {
      for (const review of response2.data.reviews) {
        ReviewResponses.push(review);
      }
    })
    .then(() => axios.get(`${YELP_URL}/businesses/${businesses[2].id}/reviews`, {
      headers: { Authorization: `${API_KEY}` },
    }))
    .then((response3) => {
      for (const review of response3.data.reviews) {
        ReviewResponses.push(review);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      sendReviews(req, res, businesses, ReviewResponses);
    });
};

sendReviews = (req, res, businesses, reviews) => {
  // console.log('reviews:', reviews)
  const response = {
    businesses,
    reviews,
  };

  res.status(200).send(response);
};

module.exports.getBusinesses = getBusinesses;
module.exports.getReviews = getReviews;
module.exports.sendReviews = sendReviews;

// Promise.all(businesses.map(business => {
//   console.log('business.id', business.id)
//   return
//     axios.get(`${YELP_URL}/businesses/${business.id}/reviews`, {
//       headers: {'Authorization': `${API_KEY}`}
//     })
//     .then(response => {
//       console.log('getRevResp:', response)
//       // return response
//       // ReviewResponses[business.name] = response['reviews']
//       // console.log('ReviewResponses[business.name]:', ReviewResponses[business.name])
//     })
//     .catch(err => console.log('error getting reviews:', err))
// }))
// // Promise.all(GetReviewsPromises)
// .then((values) => {
//   console.log('GetReviewsPromises values:', values)
//   return values
//   // sendReviews(req, res, GetReviewsPromises)
// })
// .catch(err => {
//   console.log('err', err)
// })
