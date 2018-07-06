exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin123@ds163510.mlab.com:63510/capstone2';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://admin:admin123@ds163510.mlab.com:63510/capstone2';
exports.PORT = process.env.PORT || 8080;

// mongodb://<dbuser>:<dbpassword>@ds163510.mlab.com:63510/capstone2