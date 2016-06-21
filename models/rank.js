var bookshelf = require('../config.js');
require('./user.js');
require('./trend.js');

var Rank = bookshelf.Model.extend({
  tableName: 'ranking_history',

  // a rank has one user (if trend is from custom dashboard)
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('Rank', Rank);
