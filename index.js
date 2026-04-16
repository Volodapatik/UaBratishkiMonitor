const express = require('express');
const { GameDig } = require('gamedig');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/status', (req, res) => {
    GameDig.query({
        type: 'counterstrike16',
        host: '91.211.118.77',
        port: 27040,
        socketTimeout: 5000
    }).then((state) => {
        res.json({
            status: "ok",
            name: state.name,
            map: state.map,
            online: state.players.length,
            max: state.maxplayers
        });
    }).catch((error) => {
        res.json({ status: "error", message: "offline" });
    });
});

app.listen(PORT, () => console.log(`API Ready on port ${PORT}`));
