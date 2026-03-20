const express = require('express');
const app = express();
app.use(express.json());

const crudRoutes = require('./src/routes/crud');
app.use("/api/crud/", crudRoutes);

const pokeRoutes = require('./src/routes/poke');
app.use('/api/pokemon/', pokeRoutes);

app.listen(3000, (err) => {
    console.log("Listenig on port 3000");
});