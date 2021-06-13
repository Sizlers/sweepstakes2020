const matchUrl = 'https://www.uefa.com/uefaeuro-2020/fixtures-results/#/md/33673';

function pages(pageTabs, $) {
  const pageIds = [];
  pageTabs.each((i, el) => {
    if ($(el).children('a').children('.matchday--details').text().includes('2021')) {
      let id = $(el).children('a').attr('data-match-day');
      let type = 'md';
      if (!id) {
        id = $(el).children('a').attr('data-round');
        type = 'rd';
      }
      pageIds.push({
        id,
        type,
      });
    }
  });

  const pageData = pageIds.map(
    (page) => `https://www.uefa.com/uefaeuro-2020/fixtures-results/#/${page.type}/${page.id}`
  );
  return pageData;
}

module.exports = {
  pages,
  matchUrl,
};
