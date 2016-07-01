// connect to our database and all table schema
var bookshelf = require('./config.js');

// require our bookshelf collections & models
var Users        = require('./collections/users.js');
var User         = require('./models/user.js');
var Publications = require('./collections/publications.js');
var Publication  = require('./models/publication.js');
var Trends       = require('./collections/trends.js');
var Trend        = require('./models/trend.js');
var Articles     = require('./collections/articles.js');
var Article      = require('./models/article.js');
var Ranks        = require('./collections/ranks.js');
var Rank         = require('./models/rank.js');

// require seed data
var data = require('./data/data.json');

module.exports = function() {

  // load the five publications to be crawled
  Publication.forge({
    pub_name: 'Washington Post',
    pub_url : 'http://www.washingtonpost.com',
  })
  .save();

  Publication.forge({
    pub_name: 'BBC',
    pub_url : 'http://www.bbc.com/news',
  })
  .save();

  Publication.forge({
    pub_name: 'NPR',
    pub_url : 'http://www.npr.org/sections/news',
  })
  .save();

  Publication.forge({
    pub_name: 'NYTimes',
    pub_url : 'http://www.nytimes.com/pages/todayspaper/index.html?action=Click&module=HPMiniNav&region=TopBar&WT.nav=page&contentCollection=TodaysPaper&pgtype=Homepage',
  })
  .save();

  Publication.forge({
    pub_name: 'Telegraph',
    pub_url : 'http://www.telegraph.co.uk/news/world/',
  })
  .save();

  // load one dummy record into other tables
  User.forge({
    email_address: data.emailAddress,
    link_uuid    : data.linkUuid,
    api_key      : data.apiKey,
    api_secret   : data.apiSecret,
    verified     : data.verified
  })
  .save()
  .then( function() {

    Trend.forge({
      "trend_name": data.trend,
      "rank": data.rank
    }).save()
    .then( function() {

      // create a new Article for this Trend
      Article.forge({
        "_id"                : data._id,
        "title"              : data.artTitle,
        "article_url"        : data.artUrl,
        "image_url"          : data.imageUrl,
        "frequency_viewed"   : data.freqView,
        "article_summary"    : data.text,
        "article_date"       : bookshelf.knex.fn.now(),
        "anger"              : data.watsonAnger,
        "disgust"            : data.watsonDisgust,
        "fear"               : data.watsonFear,
        "joy"                : data.watsonJoy,
        "sadness"            : data.watsonSadness,
      }).save({
        "pub_id"   : null,
      })
      .then( function() {
        console.log('SEED: successfully seeded data');
      }).catch( function(err) {
        console.log('SEED: an error occurred', err);
      }).finally( function() {

        // close the database connection when finished
        bookshelf.knex.destroy();
      });
    });
  }).catch( function(err) {
    console.log('Error: user information must be unique.', err);
    bookshelf.knex.destroy();
  });
};
