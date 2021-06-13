const cheerio = require('cheerio');
const request = require('axios');
const browserObject = require('./utlis/browser');
const scraperController = require('./utlis/pageController');
const { matchUrl, pages } = require('./matches');
const { extractGroupsFromHTML, url } = require('./groups');

module.exports.getGroups = (event, context, callback) => {
  request(url)
    .then(({ data }) => {
      const footballData = extractGroupsFromHTML(data);
      callback(null, {
        statusCode: 200,
        body: footballData,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        }
      });
    })
    .catch(callback);
};

module.exports.getMatches = (event, context, callback) => {
  request(matchUrl)
    .then(async ({ data }) => {
      const $ = cheerio.load(data);
      const pageTabs = $('[role=presentation]');
      const pageUrls = pages(pageTabs, $);
      const browserInstance = browserObject.startBrowser();
      const matchesPromises = pageUrls.map((pageUrl) => scraperController(browserInstance, pageUrl));
      let matches = [];
      await Promise.all(matchesPromises).then((matchesData) => {
        matchesData.forEach((array) => {
          matches = [...matches, ...array];
        });
      });
      const browser = await browserInstance;
      browser.close();
      callback(null, {
        statusCode: 200,
        body: matches,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        }
      });
    })
    .catch('error');
};
