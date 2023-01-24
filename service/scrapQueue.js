const axios = require("axios")

const news = require("../config/repository/news")

const scrapQueue = (job, done) => {
    try {
        getSentiment(job.data.title).then(res => {
          job.data.sentiment = res.data[0].label
          news.createNews(job.data, (err) => {
            if (err) {
              console.log(err)
            }
          });
        })

        done()
    } catch (error) {
        console.log(error)
    }
}

const getSentiment = async function (title, res) {
  try {
    let resp = await axios.post(process.env.URL_SENTIMENT, 
    {data: [title]}, 
    {
      headers: {
        "Content-Type": "application/json"
      }
    })

    return resp.data
  } catch (error) {
    console.log(error)
  }
}

module.exports = scrapQueue