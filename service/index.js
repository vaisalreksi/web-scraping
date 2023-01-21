const Queue = require("bull")
const path = require("path")
const { REDIT_PORT, REDIS_URI } = require("../config/database/redis")

const scrapQueue = new Queue('scrapQueue', {
    redis : {
        port: REDIT_PORT,
        host: REDIS_URI
    }
})

scrapQueue.process(path.join(__dirname, 'scrapQueue.js'))

scrapQueue.on("completed", (job) => {
    console.log('completed #' + job.id + ' Job')
})
