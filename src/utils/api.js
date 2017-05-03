var axios = require('axios');


/*
Github client ID

var id = '';
var secret = '';
var params = '?client_id' + id + '&client_secret' + secret;

add params to end of axios get if rate limited
*/

function getProfile(username) {
  return axios.get('https://api.github.com/users/' + username)
  .then(function(user) {
    return user.data;
  });
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/'
  + username + '/repos')
}

function getStarCount(repos) {
  return repos.data.reduce(function(count, repos) {
    return count + repos.stargazers_count;
  },0);
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([
      getProfile(player),
      getRepos(player)
  ]).then(function(data) {
      var profile = data[0];
      var repos = data[1];
      return {
        profile: profile,
        score: calculateScore(profile, repos)
      }
  });
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score;
  })
}

module.exports = {
  battle: function(players) {
    return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
  },
  fetchPopularRepos: function(language) {
    var encodedResult = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language+'&sortstars&order=desc&type=Respositories');

    return axios.get(encodedResult)
    .then(function(response) {
      return response.data.items;
    });
  }
}
