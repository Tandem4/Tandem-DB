var bookshelf = require('./config.js');

/************************************************************/
// Schema definitions
/************************************************************/

// 'increments' creates an auto incrementing column, by default used as primary key

bookshelf.knex.schema.createTable('users', function(user) {
  user.increments('id').primary();
  user.string('user_name', 100).unique();
  user.string('email', 100).unique();
})
.then(function () {

  bookshelf.knex.schema.createTable('trends', function(trend) {
    trend.increments('id').primary();
    trend.integer('rank');
    trend.string('trend_name', 255);
    trend.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
  })
  // .then(function() {

    // every time a trend is ranked, an entry is placed into the ranking_history.
    // bookshelf.knex.schema.createTable('ranking_history', function(rankedTrend) {
    //   rankedTrend.increments('id').primary();
    //   rankedTrend.integer('rank');
    //   rankedTrend.string('trend_name', 255);

    //   // adds a created_at and updated_at column, setting each to dateTime
    //   rankedTrend.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());

      // foreign keys - user_id will be null for default publications
      // rankedTrend.integer('user_id').unsigned().references('users.id').nullable();
    // })
    .then( function() {

      bookshelf.knex.schema.createTable('publications', function(publication) {
        publication.increments('id').primary();
        publication.string('pub_name', 100);
        publication.string('pub_url', 255);
        // publication.string('pub_type', 10);

        // foreign key - user_id will be null for default publications
        // publication.integer('user_id').unsigned().references('users.id').nullable() ;

      }).then( function () {

        bookshelf.knex.schema.createTable('processed_articles', function(article) {
          article.increments('id').primary();
          article.string('title', 255);
          article.string('article_url', 255);
          article.string('image_url', 255);
          article.integer('frequency_viewed');
          article.date('source_publish_date');

          // ibm watson api results
          article.integer('watson_anger');
          article.integer('watson_disgust');
          article.integer('watson_fear');
          article.integer('watson_happiness');
          article.integer('watson_sadness');
          article.integer('watson_analytical');
          article.integer('watson_confident');
          article.integer('watson_tentative');
          article.integer('watson_openness');
          article.integer('watson_conscientiousness');
          article.integer('watson_extraversion');
          article.integer('watson_agreeableness');
          article.integer('watson_emotionalRange');

          // defaults to textType 'text'; 'mediumtext' and 'longtext' also available
          article.text('lead_paragraph');

          // adds a created_at and updated_at column, setting each to dateTime
          article.timestamps();

          // foreign keys
          article.integer('pub_id').unsigned().references('publications.id');
          article.integer('trend_id').unsigned().references('trends.id');

        })
        .then( function() {
          console.log('BUILD: Successfully built schema');
        }).catch( function(err) {
          console.log('BUILD: An error occurred', err);
        })
        // close the database connection when finished
        .finally( function() {
          bookshelf.knex.destroy();
        });
      });
    // });
  });
});
