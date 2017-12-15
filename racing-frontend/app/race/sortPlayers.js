
module.exports = (players) => players.slice().sort((l, r) => {

    if(l.progress > r.progress){
        return -1;
    }

    if(l.progress < r.progress){
        return 1;
    }

    return new Date(l.ts) - new Date(r.ts);
});
