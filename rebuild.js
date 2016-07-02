var rebuild = require('./build.js');
var reseed  = require('./seed.js');

// rebuild the database
rebuild(reseed);
