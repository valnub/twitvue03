import util from './util.js'

var filters = {};

filters.userFilter = function (tweet) {
  return tweet.retweeted_status ? tweet.retweeted_status.user.name : tweet.user.name;
};

filters.screenNameFilter = function (tweet) {
  return '@' + (tweet.retweeted_status ? (tweet.retweeted_status.user.screen_name + ' (Retweeted by ' + tweet.user.screen_name + ')') : tweet.user.screen_name);
}

filters.imgUrlFilter = function (tweet) {
  var imgurl = tweet.retweeted_status ? tweet.retweeted_status.user.profile_image_url : tweet.user.profile_image_url;
  return imgurl;
};

filters.imgFilter = function (tweet) {
  return  '<img src="' + filters.imgUrlFilter(tweet) + '">';
};

filters.dateFilter = function (tweet) {
  let now = new Date();
  let createdAt = new Date(tweet.created_at);
  let timeDiff = util.dateDiff(createdAt, now);
  return timeDiff + ' ago';
};

export default filters;