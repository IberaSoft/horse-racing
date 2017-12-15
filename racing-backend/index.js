const r = require('./r');
const io = require('socket.io')();
const server = require('http').createServer();
const rand = require('u-rand');
const oddslib = require('oddslib');

function wait(t){
    return new Promise((r) => setTimeout(r, t));
}

function base(player, target){
    let b = Math.min(
        Math.max(100 / Math.pow(
            Math.max(target - player.progress, 1e-15),
            2
        ), 1e-15),
        1e15
    );

    if(isNaN(b)) return 1e-15;
    return b;
}

function normalizeRace(race){
    var target = parseFloat(race.target);

    race.players = race.players.slice(0, 5);

    for(const player of race.players){
        let prob = base(player, race.target) / race.players.map( player =>
            base(player, race.target)
        ).reduce((l, r) => l + r);

        prob = Math.max( 1e-15, Math.min(prob, 1 - 1e-15) );

        player.decimalOdds = oddslib.from('impliedProbability', prob).to('decimal');
        player.fractionalOdds = oddslib.from('impliedProbability', prob).to('fractional', {precision: 1});
    }

    for(const player of race.players){
        player.progress = Math.min(player.progress / race.target, 1);
    }

}

io.on('connection', async (socket) => {

    socket.on('createRace', async ({ target }) => {

        try{

            let n = 5;
            let result, raceID, hostPageID, playerPageID, betPageID;

            do{
                raceID = rand.string(n);

                result = await r.table('races').insert({
                    id: raceID,
                    target: target,
                    players: [],
                    countdown: null
                });

                n++;
            }while(result.errors && result.first_error.match(/duplicate/i));

            n = 5;

            do{
                playerPageID = rand.string(n);

                result = await r.table('pages').insert({
                    id: playerPageID,
                    raceID: raceID,
                    type: 'playerPage'
                });

                n++;
            }while(result.errors && result.first_error.match(/duplicate/i));

            n = 5;

            do{
                betPageID = rand.string(n);

                result = await r.table('pages').insert({
                    id: betPageID,
                    raceID: raceID,
                    type: 'betPage'
                });

                n++;
            }while(result.errors && result.first_error.match(/duplicate/i));

            n = 5;

            do{
                hostPageID = rand.string(n);

                result = await r.table('pages').insert({
                    id: hostPageID,
                    playerPage: playerPageID,
                    betPage: betPageID,
                    raceID: raceID,
                    type: 'hostPage'
                });

                n++;
            }while(result.errors && result.first_error.match(/duplicate/i));

            socket.emit('raceCreated', {hostPage: hostPageID});

        }catch(err){
            console.error('appError1->', err.toString());
            socket.emit('appError', err.toString());
        }

    });

    socket.on('renderPage', async ({ page }) => {

        try{

            let lastCountdown = null;
            let horseNumber = null;
            let players = [];

            const pageContents = await r.table('pages').get(page);
            const result = {};

            if(!pageContents){

                console.log(404, page);

                socket.emit('page', {
                    type: 'unknown'
                });

                return;
            }

            for(const [key, value] of Object.entries(pageContents)){
                if(!['id', 'raceID'].includes(key)){
                    result[key] = value;
                }
            }

            socket.emit('page', result);

            const cursor = await r.table('races').get(pageContents.raceID).changes({
                includeInitial: true
            });

            socket.on('disconnect', () => {
                cursor.close();
            });

            if(pageContents.type == 'hostPage'){

                socket.on('start', async () => {

                    try{
                        const times = [0, 1, 2, 3];
                        let time;

                        while((time = times.pop()) != null){
                            await r.table('races').get(pageContents.raceID).update({
                                countdown: time
                            });

                            await wait(1e3);
                        }

                    }catch(err){
                        console.error('appError2->', err.toString());
                        socket.emit('appError', err.toString());
                    }

                });

            }

            if(pageContents.type == 'playerPage'){

                socket.on('name', async ({ name }) => {

                    try{
                        const result = await r.table('races').get(pageContents.raceID).update({
                            players: r.row('players').insertAt(
                                r.row('players').count(),
                                {
                                    name: name,
                                    horseNumber: r.row('players').count().add(1),
                                    progress: 0,
                                    ts: r.now()
                                }
                            )
                        }, {
                            returnChanges: true
                        });

                        const player = result.changes[0].new_val.players.pop();

                        horseNumber = player.horseNumber;
                        socket.emit('player', player);

                    }catch(err){
                        console.error('appError3->', err.toString());
                        socket.emit('appError', err.toString());
                    }

                });

                socket.on('progress', async ({ progress }) => {

                    try{

                        if(horseNumber == null) throw new Error('No horse number');
                        if(lastCountdown !== 0) throw new Error('Race not started');

                        const result = await r.table('races').get(pageContents.raceID).update(row => ({
                            players: row('players').changeAt(horseNumber - 1, row('players')(horseNumber - 1).merge(
                                r.branch(
                                    row('players')(horseNumber - 1)('progress').lt(row('target')),
                                    {
                                        progress: row('players')(horseNumber - 1)('progress').add(progress),
                                        ts: r.now()
                                    },
                                    {}
                                )
                            ))
                        }));

                    }catch(err){
                        console.error('appError4->', err.toString());
                        socket.emit('appError', err.toString());
                    }

                });

            }

            if(pageContents.type == 'betPage'){

                const useWallet = async ({ walletID }) => {

                    socket.on('bet', async ({ horseNumber, amount }) => {

                        try{

                            await r.table('wallet').get(walletID).update(
                                r.branch(
                                    r.row('balance').ge(amount),
                                    {
                                        balance: r.row('balance').sub(amount),
                                        bets: r.row('bets').append({
                                            raceID: pageContents.raceID,
                                            horseNumber: horseNumber,
                                            amount: amount,
                                            name: players[horseNumber - 1].name,
                                            odds: players[horseNumber - 1].decimalOdds,
                                            fractionalOdds: players[horseNumber - 1].fractionalOdds,
                                        })
                                    },
                                    {}
                                )
                            );

                        }catch(err){
                            console.error('appError5->', err.toString());
                            socket.emit('appError', err.toString());
                        }

                    });

                    try{
                        const cursor = await r.table('wallet').get(walletID).changes({
                            includeInitial: true
                        });

                        socket.on('disconnect', () => {
                            cursor.close();
                        });

                        (async () => {

                            try{

                                while(true){
                                    const { new_val } = await cursor.next();
                                    socket.emit('wallet', new_val);
                                }

                            }catch(err){ }

                        })();

                    }catch(err){
                        console.error('appError6->', err.toString());
                        socket.emit('appError', err.toString());
                    }

                };

                socket.on('createWallet', async () => {

                    try{

                        const result = await r.table('wallet').insert({
                            balance: 50,
                            bets: []
                        });

                        useWallet({
                            walletID: result.generated_keys[0]
                        });

                    }catch(err){
                        console.error('appError7->', err.toString());
                        socket.emit('appError', err.toString());
                    }

                });

                socket.on('useWallet', useWallet);

            }

            (async () => {

                try{

                    while(true){
                        const { new_val } = await cursor.next();

                        normalizeRace(new_val);
                        players = new_val.players;

                        if(new_val.countdown != null){
                            socket.emit('countdown', {
                                countdown: lastCountdown = new_val.countdown
                            });
                        }

                        socket.emit('playerList', new_val.players);

                        if(horseNumber && players[horseNumber - 1].progress == 1){

                            await r.table('wallet').update({
                                bets: r.row('bets').filter(bet => bet('raceID').ne(pageContents.raceID)),
                                balance: r.row('balance').add(
                                    r.row('bets').map(bet =>
                                        r.branch(
                                            bet('raceID').eq(pageContents.raceID).and(
                                                bet('horseNumber').eq(horseNumber)
                                            ),
                                            bet('amount').mul(
                                                bet('odds')
                                            ),
                                            0
                                        )
                                    ).reduce((left, right) => left.add(right))
                                )
                            });

                        }

                    }

                }catch(err){
                    console.error(err.toString());
                }

            })();

        }catch(err){
            console.error('appError0->', err.toString());
            socket.emit('appError', err.toString());
        }

    });

});

io.attach(server);
server.listen(parseInt(process.env.SOCKETIO_PORT) || 8989);
