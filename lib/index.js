function init(config) {
    if (!global.db)
        global.db = new require('pg-promise')()(config);

    return {
        db: global.db,
        request: () => require('./query')(db)
    };
}

module.exports = init;
