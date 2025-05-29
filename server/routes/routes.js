// module.exports = app => {
//     app.get('/', (req, res) => {
//         res.json({ message: 'Welcome to the Chess API' });
//     });

//     app.get('/white', (req, res) => {
//         res.json({
//             color: 'white',
//             status: 'ready'
//         });
//     });

//     app.get('/black', (req, res) => {
//         if (!games[req.query.code]) {
//             return res.status(400).json({ error: 'Invalid game code' });
//         }

//         res.json({
//             color: 'black',
//             status: 'ready'
//         });
//     });
// };

module.exports = app => {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/white', (req, res) => {
        res.render('game', {
            color: 'white'
        });
    });
    app.get('/black', (req, res) => {
        if (!games[req.query.code]) {
            return res.redirect('/?error=invalidCode');
        }

        res.render('game', {
            color: 'black'
        });
    });
};