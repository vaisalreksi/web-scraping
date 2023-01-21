const Sequelize = require("sequelize")
const db = require("../database/database")

var news = db.define('news',{
    title: Sequelize.STRING,
    resume: Sequelize.STRING,
    sentiment: Sequelize.STRING,
    image: Sequelize.STRING,
    url: Sequelize.STRING,
    source: Sequelize.STRING,
    date_created: Sequelize.STRING,
    date_published: Sequelize.STRING,
    date_updated: Sequelize.STRING,
},{
    timestamps: false,
})

module.exports = news