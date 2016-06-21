var bookshelf = require('../config.js');
var Publication = require('../models/publication.js');

var Publications = new bookshelf.Collection();

Publications.model = Publication;

module.exports = Publications;
