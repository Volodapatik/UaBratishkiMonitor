const express = require('express');
const { GameDig } = require('gamedig');
const app = express();
const PORT = process.env.PORT || 3000;

function formatTime(seconds) {
    if (!seconds && seconds !== 0) return "0хв";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}г ${m}хв` : `${m}хв`;
}

app.get('/status', (req, res) => {
    GameDig.query({
        type: 'counterstrike16',
        host: '91.211.118.77',
        port: 27040,
        socketTimeout: 5000
    }).then((state) => {
        const playersData = state.players
            .filter(p => p.name)
            .map(p => ({
                name: p.name,
                time: formatTime(p.raw.time || p.time || 0)
            }));

        res.json({
            status: "ok",
            map: state.map,
            online: state.players.length,
            max: state.maxplayers,
            players: playersData
        });
    }).catch((error) => {
        res.json({ status: "error" });
    });
});

app.listen(PORT, () => console.log(`API Ready` trial));
