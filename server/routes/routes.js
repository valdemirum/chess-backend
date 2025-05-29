module.exports = app => {
  app.get('/white', (req, res) => {
    console.log('White player requested to join');
    res.json({ color: 'white', message: 'White player joined' });
  });

  app.get('/black', (req, res) => {
    const code = req.query.code;
    console.log(`Black player requested to join with code: ${code}`);
    if (!code || !games[code]) {
      console.warn(`Invalid or missing code: ${code}`);
      return res.status(400).json({ error: 'Invalid or missing game code' });
    }
    res.json({ color: 'black', message: 'Black player joined' });
  });
};