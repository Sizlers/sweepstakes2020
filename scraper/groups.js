const cheerio = require('cheerio');

const url = 'https://www.uefa.com/uefaeuro-2020/standings/';

function extractGroupsFromHTML(html) {
  const $ = cheerio.load(html);
  const groupList = $('.group-container');

  const groups = [];
  groupList.each((i, el) => {
    const groupTitle = $(el).children('.standings--groupname').children('.group-name').first().text().trim();

    const groupStandings = $(el).children('.table--standings').children('tbody').children('tr');

    const teams = [];

    groupStandings.each((i, el) => {
      const teamName = $(el)
        .children('.table_team-name')
        .children('.table_team-name_block')
        .children('.team-name')
        .text()
        .trim()
        .split('\n')[0];

      const played = $(el).children('.table_team-played').text().trim();
      const won = $(el).children('.table_team-won').text().trim();
      const drawn = $(el).children('.table_team-drawn').text().trim();
      const lost = $(el).children('.table_team-lost').text().trim();
      const scoresFor = $(el).children('.table_team-for').text().trim();
      const scoresAgainst = $(el).children('.table_team-against').text().trim();
      const difference = $(el).children('.table_team-goal-diff').text().trim();
      const points = $(el).children('.table_team-points').text().trim();

      teams.push({
        teamName,
        played,
        won,
        drawn,
        lost,
        scoresFor,
        scoresAgainst,
        difference,
        points,
      });
    });

    groups.push({
      group: groupTitle,
      teams,
    });
  });

  return [groups];
}

module.exports = {
  extractGroupsFromHTML,
  url,
};
