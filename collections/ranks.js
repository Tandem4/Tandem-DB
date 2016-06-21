var bookshelf = require('../config.js');
var Rank = require('../models/rank.js');

var Ranks = new bookshelf.Collection();

Ranks.model = Rank;

module.exports = Ranks;
