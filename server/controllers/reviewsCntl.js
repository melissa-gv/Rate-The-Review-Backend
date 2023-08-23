const axios = require('axios')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const { YELP_URL, API_KEY } = process.env

const LIMIT_BUSINESSES = 3
const RADIUS = 10000

const getBusinesses = async (location) => {
  try {
    const OFFSET = Math.floor(Math.random() * 100)
    const businessResponse = await axios.get(`${YELP_URL}/businesses/search`, {
      headers: { Authorization: API_KEY },
      params: {
        term: 'restaurants',
        location,
        radius: RADIUS,
        limit: LIMIT_BUSINESSES,
        offset: OFFSET,
      },
    })
    console.log('fetched business data for:', businessResponse.data.businesses)
    return businessResponse.data.businesses
  } catch (error) {
    console.log('Error fetching business data:', error)
  }
  return null
}

const extractReviewsFromHTML = (HTMLs) => {
  const reviews = []
  HTMLs.forEach((page) => {
    const dom = new JSDOM(page)
    const rating1 = Number(dom.window.document.getElementById('reviews').querySelectorAll('.five-stars--regular__09f24__DgBNj')[0].attributes['aria-label'].textContent.substring(0, 1))
    const rating2 = Number(dom.window.document.getElementById('reviews').querySelectorAll('.five-stars--regular__09f24__DgBNj')[1].attributes['aria-label'].textContent.substring(0, 1))
    const date1 = dom.window.document.getElementById('reviews').querySelectorAll('span.css-chan6m')[0].innerHTML
    const date2 = dom.window.document.getElementById('reviews').querySelectorAll('span.css-chan6m')[1].innerHTML
    const reviewText1 = dom.window.document.getElementById('reviews').querySelectorAll('.comment__09f24__D0cxf')[0].textContent
    const reviewText2 = dom.window.document.getElementById('reviews').querySelectorAll('.comment__09f24__D0cxf')[1].textContent
    reviews.push(
      {
        rating: rating1, reviewText: reviewText1, date: date1,
      },
      { rating: rating2, reviewText: reviewText2, date: date2 },
    )
  })
  return reviews
}

const fetchBusinessHTML = async (url) => {
  const getReviewResponse = await axios.get(url)
  return getReviewResponse
}

const getReviews = async (businesses) => {
  const getReviewsPromises = businesses.map(async (business) => {
    let response = await fetchBusinessHTML(business.url)

    // re-attemps fetching HTML for failed responses after 1 second
    if (response.status !== 200) {
      setTimeout(async () => {
        console.log('re-attempting to fetch HTML for: ', business.url)
        response = await fetchBusinessHTML(business.url)
      }, 1000)
    }
    return response.data
  })

  const reviewResponses = await Promise.all(getReviewsPromises)
  return extractReviewsFromHTML(reviewResponses)
}

const getBusinessesandReviews = async (req, res) => {
  try {
    const businesses = await getBusinesses(req.query.location)
    const reviews = await getReviews(businesses)
    console.log({ businesses, reviews })
    res.status(200).send({ businesses, reviews })
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

module.exports = { getBusinessesandReviews }
