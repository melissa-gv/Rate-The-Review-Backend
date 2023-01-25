/* eslint-disable no-use-before-define */
const axios = require('axios')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const { YELP_URL, API_KEY } = process.env

const getBusinesses = (req, res) => {
  const offsetNum = Math.floor(Math.random() * 1000)
  axios.get(`${YELP_URL}/businesses/search`, {
    headers: { Authorization: `${API_KEY}` },
    params: {
      term: 'restaurants',
      location: req.query.location,
      radius: 10000,
      limit: 3,
      offset: offsetNum,
    },
  })
    .then((businessesResponse) => {
      getReviews(req, res, businessesResponse.data.businesses)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

async function getReviews(req, res, businesses) {
  const getReviewsRequest = businesses.map((business) => axios.get(business.url, {
    headers: { Authorization: `${API_KEY}` },
  }))

  const responses = await Promise.allSettled(getReviewsRequest)
  console.log('businesses response:', businesses)
  console.log('getReviewsRequest response:', responses)

  const fulfilled = responses.filter((result) => result.status === 'fulfilled')
  const rejected = responses.filter((result) => result.status === 'rejected')
  console.log('rejected:', rejected)

  const reviews = []
  if (fulfilled.length) {
    fulfilled.forEach((reviewsResponse) => {
      const dom = new JSDOM(reviewsResponse.value.data)
      const rating1 = Number(dom.window.document.getElementById('reviews').querySelectorAll('.five-stars--regular__09f24__DgBNj')[0].attributes['aria-label'].textContent.substring(0, 1))
      const rating2 = Number(dom.window.document.getElementById('reviews').querySelectorAll('.five-stars--regular__09f24__DgBNj')[1].attributes['aria-label'].textContent.substring(0, 1))
      const date1 = dom.window.document.getElementById('reviews').querySelectorAll('span.css-chan6m')[0].innerHTML
      const date2 = dom.window.document.getElementById('reviews').querySelectorAll('span.css-chan6m')[1].innerHTML
      const reviewText1 = dom.window.document.getElementById('reviews').querySelectorAll('.comment__09f24__gu0rG')[0].textContent
      const reviewText2 = dom.window.document.getElementById('reviews').querySelectorAll('.comment__09f24__gu0rG')[1].textContent
      reviews.push(
        {
          rating: rating1, reviewText: reviewText1, date: date1,
        },
        { rating: rating2, reviewText: reviewText2, date: date2 },
      )
    })
    console.log('review data:', reviews)
    res.status(200).send({ reviews, businesses })
  } else {
    res.sendStatus(500)
  }
}

module.exports.getBusinesses = getBusinesses
module.exports.getReviews = getReviews
