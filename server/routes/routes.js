module.exports = app => {
    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to the chess server' });
    });

    app.get('/white', (req, res) => {
        res.json({ color: 'white', message: 'Ready to join as white' });
    });

    app.get('/black', (req, res) => {
        if (!games[req.query.code]) {
            return res.status(400).json({ error: 'Invalid game code' });
        }
        res.json({ color: 'black', message: 'Joined game as black' });
    });
};