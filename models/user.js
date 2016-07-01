//TODO: Send revised model code here to Nicole to update 'tandem-db' npm package
var bookshelf = require('../config.js');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
require('./publication.js');

var User = bookshelf.Model.extend({
  tableName: 'users',

  //Remember - ES6 fat arrow function syntax removed, as sets 'this' to be the enclosing scope
  initialize: function() {
    this.on('creating', this.hashPassword, this);;
  },

  hashPassword: (model, attrs, options) => {
    //Use promise to force Bookshelf to wait for bcrypt resolution before updating database
    return new Promise((resolve, reject) => {
      //Generate the hash using the password & a salt
      bcrypt.hash(model.attributes.api_key, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        model.set('api_key', hash);
        resolve(hash); //Database only updates at this point
      })
    })
  },

  //Remember - ES6 fat arrow function syntax removed, as sets 'this' to be the enclosing scope
  authenticate: function(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.attributes.api_key);
  }

  // a user has many (custom) publications
  // publications: function() {
  //   return this.hasMany('Publication');
  // }

});

module.exports = bookshelf.model('User', User);
