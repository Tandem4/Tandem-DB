/*!
 * tandem-db
 * v1.0.1
 * MySQL database for Tandem
 */

// mysql connection
exports.db           = require('./config.js');

// Bookshelf models and collections
exports.Users        = require('./collections/users.js');
exports.User         = require('./models/user.js');
exports.Trends       = require('./collections/trends.js');
exports.Trend        = require('./models/trend.js');
// exports.Ranks        = require('./collections/ranks.js');
// exports.Rank         = require('./models/rank.js');
exports.Publications = require('./collections/publications.js');
exports.Publication  = require('./models/publication.js');
exports.Articles     = require('./collections/articles.js');
exports.Article      = require('./models/article.js');

exports.printGreeting = function() {
  console.log("Hello world from tandem-db!");
};
