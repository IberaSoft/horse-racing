module.exports = require('rethinkdbdash')({
    cursor: true,
    host: process.env.RACING_HOST || 'localhost',
    port: process.env.RACING_PORT || 28015,
    db: process.env.RACING_DB || 'racing',
    user: process.env.RACING_USER || 'admin',
    password:process.env.RACING_PWD || ''
});
