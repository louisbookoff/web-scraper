// reddit-scraper.js

const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const url = 'https://www.reddit.com/r/news/'

// launches a puppeteer instnace, navigates to the provided URL, and returns the HTMl content after all the JavaScript on the page has been executed.
// Cheerio is then used to parse and extra the desired data from the HTML string 
puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function () {
      return page.content()
    })
  })
    .then(html => {
      const $ = cheerio.load(html)
      const newsHeadLines = []
      $('a[href*="/r/news/comments"] > h2').each(function() {
        newsHeadLines.push({
          title: $(this).text()
        })
      })
      console.log(newsHeadLines)
    })
    .catch(console.error)
