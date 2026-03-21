const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const crudRoutes = require('./src/routes/crud');
app.use("/api/crud", crudRoutes);

const pokeRoutes = require('./src/routes/poke');
app.use('/api/pokemon', pokeRoutes);

const digiRoutes = require('./src/routes/digi');
app.use('/api/digimon', digiRoutes);

app.listen(3000, (err) => {
    console.log("Listenig on port 3000");
});