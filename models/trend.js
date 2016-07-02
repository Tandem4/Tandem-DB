var bookshelf = require('../config.js');
require('./article.js');
// require('./rank.js');

var Trend = bookshelf.Model.extend({
  tableName: 'trends',
  hasTimestamps: true,

  // a trend has many articles
  articles: function() {
    return this.belongsToMany('Article', 'processed_articles_trends');
  }

  // a trend has one instance of rank history
  // rank: function() {
  //   return this.hasOne('Rank');
  // }

});

module.exports = bookshelf.model('Trend', Trend);
