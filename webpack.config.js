var buildType = process.env.NODE_ENV || 'dev';

module.exports = require('./config/webpack.' + buildType + '.js');
