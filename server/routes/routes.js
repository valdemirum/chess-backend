// routes/routes.js

module.exports = app => {
  app.get('/white', (req, res) => {
    res.json({ color: 'white', message: 'White player joined' });
  });

  app.get('/black', (req, res) => {
    if (!games[req.query.code]) {
      return res.status(400).json({ error: 'Invalid code' });
    }
    res.json({ color: 'black', message: 'Black player joined' });
  });
};
