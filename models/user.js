var bookshelf = require('../config.js');
require('./publication.js');

var User = bookshelf.Model.extend({
  tableName: 'users',

  // a user has many (custom) publications
  // publications: function() {
  //   return this.hasMany('Publication');
  // }

});

module.exports = bookshelf.model('User', User);
