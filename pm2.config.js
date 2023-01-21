require("dotenv").config();

module.exports = {
    apps : [{
      name: 'Scraping Web Data',
      script: 'app.js',
      instances: 1,
      cron_restart: process.env.CRON,
      watch: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  }