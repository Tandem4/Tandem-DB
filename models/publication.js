var bookshelf = require('../config.js');
require('./article.js');

var Publication = bookshelf.Model.extend({
  tableName: 'publications',

  // a publication has many articles
  articles: function() {
    return this.hasMany('Article');
  }
});

module.exports = bookshelf.model('Publication', Publication);
