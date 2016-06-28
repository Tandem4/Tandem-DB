var bookshelf = require('../config.js');
// the Registry plugin expects related models to be required, but does not necessitate assigning to a variable
require('./publication.js');
require('./trend.js');

var Article = bookshelf.Model.extend({
  tableName: 'processed_articles',
  hasTimestamps: true,

  // an article has one publication
  publication: function() {
    return this.belongsTo('Publication');
  },

  // an article has one trend
  // trend: function() {
  //   return this.belongsTo('Trend');
  // }
});

// the Registry plugin allows us to refer to a model via a string
module.exports = bookshelf.model('Article', Article);
