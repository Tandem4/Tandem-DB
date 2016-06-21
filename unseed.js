var bookshelf = require('./config.js');

// sequentially drop any existing data if we intend to re-seed the db
bookshelf.knex.schema.dropTableIfExists('processed_articles')
.then( function(){
  bookshelf.knex.schema.dropTableIfExists('publications')
  .then( function() {
    bookshelf.knex.schema.dropTableIfExists('ranking_history')
    .then( function() {
      bookshelf.knex.schema.dropTableIfExists('trends')
      .then( function() {
        bookshelf.knex.schema.dropTableIfExists('users')
        .then( function() {
          console.log('UNSEED: previous data dropped');
        })
        .catch( function(err) {
          console.log('UNSEED: an error occurred', err);
        })
        // close the database connection when finished
        .finally( function() {
          bookshelf.knex.destroy();
        })
      });
    });
  });
});
