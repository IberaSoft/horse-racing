const r = require('./r');

(async () => {

    try{

        await r.dbCreate(process.env.RACING_DB || 'racing');

        await r.tableCreate('races');
        await r.tableCreate('pages');
        await r.table('pages').indexCreate('raceID')
        await r.tableCreate('wallet');

    }catch(err){ }

    process.exit();

})();
