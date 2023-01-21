const news = require("../config/repository/news")

const scrapQueue = (job, done) => {
    try {
        news.createNews(job.data, (err) => {
            if (err) {
              console.log(err)
            }
          });
        done()
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = scrapQueue