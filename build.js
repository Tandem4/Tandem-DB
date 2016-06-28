var bookshelf = require('./config.js');

/************************************************************/
// Schema definitions
/************************************************************/

// 'increments' creates an auto incrementing column, by default used as primary key

bookshelf.knex.schema.createTable('users', function(user) {
  user.increments('_id').primary();
  user.string('email_address', 100).unique();
  user.string('link_uuid', 255);
  user.string('api_key', 255);
  user.string('api_secret', 255);
  user.boolean('verified');
  user.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());  // to be used as salt
})
.then(function () {

  bookshelf.knex.schema.createTable('trends', function(trend) {
    trend.increments('_id').primary();
    trend.float('rank');
    trend.string('trend_name', 255);

    trend.timestamps();
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
        publication.increments('_id').primary();
        publication.string('pub_name', 100);
        publication.string('pub_url', 255);
        // publication.string('pub_type', 10);

        // foreign key - user_id will be null for default publications
        // publication.integer('user_id').unsigned().references('users.id').nullable() ;

      }).then( function () {

        bookshelf.knex.schema.createTable('processed_articles', function(article) {

          // articles inherit their id from mongo/redis
          article.string('_id').primary();

          article.string('title', 255);
          article.integer('frequency_viewed');
          article.string('article_date');

          // ibm watson api results
          article.integer('anger');
          article.integer('disgust');
          article.integer('fear');
          article.integer('joy');
          article.integer('sadness');
          article.string('type');

          // defaults to textType 'text'; 'mediumtext' and 'longtext' also available
          article.text('article_summary');

          // urls are of unknown length
          article.text('article_url');
          article.text('image_url');

          // adds a created_at and updated_at column, setting each to dateTime
          article.timestamps();

          // foreign keys
          article.integer('pub_id').unsigned().references('publications._id');
          // article.integer('trend_id').unsigned().references('trends._id');

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
