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

// create a new user
User.forge({
  user_name: data.username,
  email: data.email
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
      // pub_type: data.pubType,
      pub_url : data.pubUrl,
    })
    .save()  // {user_id: null}

    // create a new Trend
    .then( function() {
      Trend.forge({
        trend_name: data.trend,
        rank: data.rank
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
                "title"              : data.artTitle,
                "article_url"        : data.artUrl,
                "image_url"          : data.imageUrl,
                "frequency_viewed"   : data.freqView,
                "lead_paragraph"     : data.text,
                "source_publish_date": bookshelf.knex.fn.now(),
                "watson_anger"             : data.watsonAnger,
                "watson_disgust"           : data.watsonDisgust,
                "watson_fear"              : data.watsonFear,
                "watson_happiness"         : data.watsonHappiness,
                "watson_sadness"           : data.watsonSadness,
                "watson_analytical"        : data.watsonAnalytical,
                "watson_confident"         : data.watsonConfident,
                "watson_tentative"         : data.watsonTentative,
                "watson_openness"          : data.watsonOpenness,
                "watson_conscientiousness" : data.watsonConscientiousness,
                "watson_extraversion"      : data.watsonExtraversion,
                "watson_agreeableness"     : data.watsonAgreeableness,
                "watson_emotionalRange"    : data.watsonEmotionalRange
              }).save({
                "pub_id"   : matchedPub.id,
                "trend_id" : matchedTrend.id
              }).then( function() {
                console.log('SEED: successfully seeded data');
              }).catch( function(err) {
                console.log('SEED: an error occurred', err);
              }).finally( function() {

                // close the database connection when finished
                bookshelf.knex.destroy();
              });
            });
          });
        // });
      // });
    });
  });
}).catch( function(err) {
  console.log('Error: user information must be unique.', err);
  bookshelf.knex.destroy();
});
