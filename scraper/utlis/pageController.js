async function handleStraper(url, browserInstance) {
  let returnJSON;

  const scraperObject = {
    url,
    async scraper(browser) {
      const page = await browser.newPage();
      await page.goto(this.url);
      await page.waitForSelector('.match-row');

      const datesList = await page.$$eval('.match-row', (dates) => {
        dates = dates.map((el) => ({
          name: el.querySelector('meta[itemprop=name]').getAttribute('content'),
          date: el.querySelector('meta[itemprop=startDate]').getAttribute('content'),
          url: el.querySelector('meta[itemprop=url]').getAttribute('content'),
          location: `${el.querySelector('.match-location_venue').innerHTML} - ${
            el.querySelector('.match-location_stadium').innerHTML
          }`,
        }));
        return JSON.stringify(dates);
      });
      await page.close();
      returnJSON = JSON.parse(datesList);
    },
  };

  let browser;
  try {
    browser = await browserInstance;
    await scraperObject.scraper(browser);
    return returnJSON;
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err);
  }
}

async function scrapeAll(browserInstance, url) {
  return handleStraper(url, browserInstance);
}

module.exports = (browserInstance, url) => scrapeAll(browserInstance, url);
