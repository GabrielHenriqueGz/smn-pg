function init(config) {
    const db = require('pg-db')(config);

    return {
        db: db,
        request: () => require('./query')(db)
    };
}

module.exports = init;
