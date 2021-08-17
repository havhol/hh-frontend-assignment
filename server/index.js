const express = require('express');
const cors = require('cors');
const ships = require('./ships.json');
const server = express();
const port = 4000;

server.use(cors());

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

server.get(['/api/ships', '/api/ships/:query'], (req, res) => {
  const query = req.params.query;

  if (!query) {
    return res.json(ships);
  }

  const matches = ships.filter((ship) =>
    ship.heading.toLowerCase().includes(query.toLowerCase())
  );

  res.json(matches);
});
