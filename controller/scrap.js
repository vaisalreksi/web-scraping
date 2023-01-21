const axios = require("axios")
const cheerio = require("cheerio")
const Queue = require("bull")
const { REDIT_PORT, REDIS_URI } = require("../config/database/redis")

const scrapQueue = new Queue('scrapQueue', {
    redis : {
        port: REDIT_PORT,
        host: REDIS_URI
    }
})

const controller = {}

controller.scrapingData = async function (req, res) {
    try {
        let res = await axios.get(req)
        let $ = await cheerio.load(res.data,{xmlMode: true})
        for (const value of $('item')) {
            var data = $(value)

            let link = data.children('link').text().trim()
            let getBody = await controller.scrapingBody(link)
            let date = new Date()

            dataJson = {
                image: getBody.image,
                source: getBody.source,
                resume: getBody.resume,
                title: data.children('title').text().trim(),
                date_published: data.children('pubDate').text().trim(),
                url: link,
                date_created: date,
                date_updated: date,
            }

            await scrapQueue.add(dataJson)
        }

    } catch (e) {
        console.log(e)
    }
}

controller.scrapingBody = async function (req, res) {
    try {
        let result = {}
        let resp = await axios.get(req)
        let $ = await cheerio.load(resp.data,{xmlMode: true})
        
        let type = req.search("/video/")
        if(type > 0){
            $('.post-content').each((i,e)=>{
                result = {
                    source: "",
                    image: "",
                    resume: $(e).find('.clearfix').text().trim()
                }
            })
        }else{
            $('.post-header > .image-overlay > picture').each((i,e)=>{
                result.image = $(e).find('img').attr('data-src')
            })
            $('.post-content').each((i,e)=>{
                var data = $(e)
                result.source = data.children('.text-muted').text().trim()
    
                data.children('.baca-juga').remove()
                data.children('div').remove()
                data.children('.text-muted').remove()
    
                result.resume = $(e).text().trim()
            })
        }
        
        return result
    } catch (e) {
        console.log(e)
    }
}

module.exports = controller