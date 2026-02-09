const db = require('../models/connection');


async function Poketodos(req, res) {
    try {
        const query = "SELECT * FROM pokemon_simple ORDER BY id ASC";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los pokémon");
    }
}

async function pokeporid(req, res) {
    const { id } = req.params;
    try {
        const query = "SELECT * FROM pokemon_simple WHERE id = $1";
        const resultado = await db.query(query, [id]);
        
        if (resultado.rows.length === 0) {
            return res.status(404).send("Pokémon no encontrado");
        }
        res.json(resultado.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener el pokémon");
    }
}

async function pokeinsert(req, res) {
    try {
        const { id, nombre, tipo } = req.body;
        const query = "INSERT INTO pokemon_simple (id, nombre, tipo) VALUES ($1, $2, $3)";
        await db.query(query, [id, nombre, tipo]);
        res.send("Pokémon registrado");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al insertar el pokémon");
    }
    res.send("Pokémon registrado");
}

async function pokeput(req, res) {
    const { id } = req.params;
    const { nombre, tipo } = req.body;
    try {
        const query = "UPDATE pokemon_simple SET nombre = $1, tipo = $2 WHERE id = $3";
        await db.query(query, [nombre, tipo, id]);
        res.json({ mensaje: "Pokémon actualizado", id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el pokémon");
    }
}

async function pokepat(req, res) {
    const { id } = req.params;
    const { tipo } = req.body;
    try {
        const query = "UPDATE pokemon_simple SET tipo = $1 WHERE id = $2";
        await db.query(query, [tipo, id]);
        res.json({ mensaje: "Tipo de pokémon actualizado", id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el tipo");
    }
}

async function pokedele(req, res) {
    const { id } = req.params;
    try {
        const query = "DELETE FROM pokemon_simple WHERE id = $1";
        await db.query(query, [id]);
        res.json({ mensaje: "Pokémon eliminado correctamente", id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el pokémon");
    }
}

module.exports = {
    Poketodos,
    pokeporid,
    pokeinsert,
    pokeput,
    pokepat,
    pokedele,
} 