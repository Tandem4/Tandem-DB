var bookshelf = require('../config.js');
var Article = require('../models/article.js');

var Articles = new bookshelf.Collection();

Articles.model = Article;

module.exports = Articles;
