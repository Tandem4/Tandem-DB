var bookshelf = require('../config.js');
var Trend = require('../models/trend.js');

var Trends = new bookshelf.Collection();

Trends.model = Trend;

module.exports = Trends;
