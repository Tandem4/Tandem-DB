/*!
 * tandem-db
 * v1.0.0
 * MySQL database for Tandem
 */

exports.db = require('./config.js');

exports.printMsg = function() {
  console.log("This is a message from tandem.");
};
