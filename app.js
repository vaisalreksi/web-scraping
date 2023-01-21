require("dotenv").config();
require("./service/index")

const scrap = require("./controller/scrap")

const url = process.env.URL_SCRAP
scrap.scrapingData(url)