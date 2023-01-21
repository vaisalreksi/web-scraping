# web-scraping
Web Scraping using cheerio

# Introduction
Web Scraping using cheerio and use redis to queue the data

# Database
```
create table news 
| field         | type   |
| title         | string |
| resume        | string |
| sentiment     | string |
| image         | string |
| url           | string |
| source        | string |
| date_created  | string |
| date_published| string |
| date_updated  | string |
```

### Setup
```hash
npm install
cp .env.example .env

```
### Running
```
npm run dev -> nodemon

===

pm2 start pm2.config.js -> to start cron
pm2 stop pm2.config.js -> to stop cron
```