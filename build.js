var bookshelf = require('./config.js');

/************************************************************/
// Schema definitions
/************************************************************/

// 'increments' creates an auto incrementing column, by default used as primary key
console.log('creating users table');
bookshelf.knex.schema.createTable('users', function(user) {
  user.increments('id').primary();
  user.string('user_name', 100).unique();
  user.string('email', 100).unique();
})
.then(function () {
  console.log('creating trends table');
  bookshelf.knex.schema.createTable('trends', function(trend) {
    trend.increments('id').primary();
    trend.string('trend_name', 255);
    trend.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());
  })
  .then(function() {
    console.log('creating ranking table');
    // every time a trend is ranked, an entry is placed into the ranking_history.
    bookshelf.knex.schema.createTable('ranking_history', function(rankedTrend) {
      rankedTrend.increments('id').primary();
      rankedTrend.integer('rank');
      rankedTrend.string('trend_name', 255);

      // adds a created_at and updated_at column, setting each to dateTime
      rankedTrend.timestamp('created_at').defaultTo(bookshelf.knex.fn.now());

      // foreign keys - user_id will be null for default publications
      rankedTrend.integer('user_id').unsigned().references('users.id').nullable();
    })
    .then( function() {
      console.log('creating publications table');
      bookshelf.knex.schema.createTable('publications', function(publication) {
        publication.increments('id').primary();
        publication.string('pub_name', 100);
        publication.string('pub_url', 255);
        publication.string('pub_type', 10);

        // foreign key - user_id will be null for default publications
        publication.integer('user_id').unsigned().references('users.id').nullable() ;

      }).then( function () {
        console.log('creating articles table');
        bookshelf.knex.schema.createTable('processed_articles', function(article) {
          article.increments('id').primary();
          article.string('title', 255);
          article.string('article_url', 255);
          article.string('image_url', 255);
          article.integer('frequency_viewed');
          article.integer('sentiment_score');
          article.date('source_publish_date');

          // defaults to textType 'text'; 'mediumtext' and 'longtext' also available
          article.text('lead_paragraph');
          article.text('full_text', 'longtext');

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
    });
  });
});
