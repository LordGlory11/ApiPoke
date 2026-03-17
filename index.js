const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
/* app.get("/api/prueba", (req, res)=>{
    console.log("prueba");
    res.send("prueba");
});
 */
const crudRoutes = require('./src/routes/crud');
const pokeRoutes = require('./src/routes/poke');
const db = require('./db');

// Rutas CRUD
app.use("/api/digimon", crudRoutes);
app.use('/api/pokemon', pokeRoutes);

// Login contra la tabla usuarios
app.post("/api/login", async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ mensaje: "Usuario y contraseña son obligatorios" });
    }

    try {
        const result = await db.query(
            "SELECT id, usuario FROM usuarios WHERE usuario = $1 AND password = $2",
            [usuario, password]
        );

        if (result.rows.length === 0) {
          return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const user = result.rows[0];

        res.json({
            mensaje: "Login correcto",
            usuario: user,
            token: "fake-token-demo",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: "Error al validar las credenciales" });
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});