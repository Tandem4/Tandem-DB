 /*!
  *  Tandem-db: MySQL database for Tandem
  *
  *  To clear, re-build and re-seed the database, run:
  *
  *    `npm run seed`
  *
  *  This will populate your database with the initial data from `data.json`
  */

var dbConnection = require('./config.js');

// Rebuild database
var rebuild = require('./build.js');
var reseed  = require('./seed.js');

// Bookshelf models and collections
var Users        = require('./collections/users.js');
var User         = require('./models/user.js');
var Trends       = require('./collections/trends.js');
var Trend        = require('./models/trend.js');
var Publications = require('./collections/publications.js');
var Publication  = require('./models/publication.js');
var Articles     = require('./collections/articles.js');
var Article      = require('./models/article.js');

module.exports = {

  db  : dbConnection,
  Users       : Users,
  User        : User,
  Trends      : Trends,
  Trend       : Trend,
  Publications: Publications,
  Publication : Publication,
  Articles    : Articles,
  Article     : Article,

  seed: function() {
    rebuild(reseed);
  },

  printGreeting: function() {
    console.log("Hello world from tandem-db!");
  }

};
