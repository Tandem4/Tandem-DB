/**
 *  To clear, re-build and re-seed the database, run:
 *
 *    `npm run seed`
 *
 *  This will populate your database with the initial data from `data.json`
 */

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
var data = require('./data.json');

var article1 = require('./article1.json');
var article2 = require('./article2.json');
var article3 = require('./article3.json');

// create a new user
User.forge({
  email_address: data.emailAddress,
  link_uuid    : data.linkUuid,
  api_key      : data.apiKey,
  api_secret   : data.apiSecret,
  verified     : data.verified
})
.save()
.then( function() {

  // fetch that user
  // User.forge({user_name: data.username})
  // .fetch()
  // .then( function(matchedUser) {

    // create a new Publication for this user
    // default publications will have a null user_id
    Publication.forge({
      pub_name: data.pubName,
      pub_url : data.pubUrl,
      // pub_type: data.pubType,
    })
    .save()  // {user_id: null}

    // create a new Trend
    .then( function() {
      Trend.forge({
        "trend_name": data.trend,
        "rank": data.rank
      }).save()

      .then( function() {

        // A rank history record should automatically be created every time a new Trend is entered
        // may or may not have an associated user
        // Rank.forge({
        //   trend_name: data.trend,
        //   rank: data.rank
        // }).save() // { user_id: matchedUser.id }
        // .then( function() {

          // fetch the appropriate publication
          Publication.forge({pub_name: data.pubName})
          .fetch()
          .then( function(matchedPub) {

            // fetch the appropriate trend
            Trend.forge({trend_name: data.trend})
            .fetch()
            .then( function( matchedTrend) {

              // create a new Article for this Trend/Publication
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
                "pub_id"   : matchedPub.id,
                // "trend_id" : matchedTrend.id
              })
              // forge some extra articles for testing
              // .then( function() {

                // .then( function() {

                  // .then( function() {

                    .then( function() {
                      console.log('SEED: successfully seeded data');
                    }).catch( function(err) {
                      console.log('SEED: an error occurred', err);
                    }).finally( function() {

                      // close the database connection when finished
                      bookshelf.knex.destroy();
                    });
                  });
                });
              });
            });
          // });
        // });
      // });
    // });
  // });
}).catch( function(err) {
  console.log('Error: user information must be unique.', err);
  bookshelf.knex.destroy();
});

// forge some extra articles

Article.forge({
  "_id"                : article1._id,
  "title"              : article1.title,
  "article_url"        : article1.article_url,
  "image_url"          : article1.image_url,
  "frequency_viewed"   : article1.frequency_viewed,
  "article_summary"    : article1.article_summary,
  "article_date"       : bookshelf.knex.fn.now(),
  "anger"              : article1.anger,
  "disgust"            : article1.disgust,
  "fear"               : article1.fear,
  "joy"                : article1.joy,
  "sadness"            : article1.sadness

  // pub_id is returning null
}).save({"pub_id": null});

Article.forge({
  "_id"                : article2._id,
  "title"              : article2.title,
  "article_url"        : article2.article_url,
  "image_url"          : article2.image_url,
  "frequency_viewed"   : article2.frequency_viewed,
  "article_summary"    : article2.article_summary,
  "article_date"       : bookshelf.knex.fn.now(),
  "anger"              : article2.anger,
  "disgust"            : article2.disgust,
  "fear"               : article2.fear,
  "joy"                : article2.joy,
  "sadness"            : article2.sadness

  // pub_id is returning null
}).save({"pub_id": null});

Article.forge({
  "_id"                : article3._id,
  "title"              : article3.title,
  "article_url"        : article3.article_url,
  "image_url"          : article3.image_url,
  "frequency_viewed"   : article3.frequency_viewed,
  "article_summary"    : article3.article_summary,
  "article_date"       : bookshelf.knex.fn.now(),
  "anger"              : article3.anger,
  "disgust"            : article3.disgust,
  "fear"               : article3.fear,
  "joy"                : article3.joy,
  "sadness"            : article3.sadness

  // pub_id is returning null
}).save({"pub_id": null});


// make some more trends
Trend.forge({
  trend_name: "britain",
  rank: data.rank
}).save();

Trend.forge({
  trend_name: "cricket",
  rank: data.rank
}).save();

Trend.forge({
  trend_name: "flooding",
  rank: data.rank
}).save();

