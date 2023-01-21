const { Op } = require("sequelize");
const news = require("../model/news");
const repository = {};

repository.createNews = async function (req, callback) {
  try {
    const check = await news.findOne({ where: { title: req.title } });
    if (check === null) {
      const { title, resume, sentiment, image, url, source, date_created, date_published, date_updated } = req;
      await news.create({
        title,
        resume,
        sentiment,
        image,
        url,
        source,
        date_created,
        date_published,
        date_updated,
      });
    } 

    return callback(null);
  } catch (error) {
    return callback(error);
  }
};

module.exports = repository;
