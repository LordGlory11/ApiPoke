const express = require("express");
const router = express.Router();

const funciones = require("../controller/poke");

// CRUD REST principal para /api/pokemon
router.get("/todosPokemones", funciones.obtenerTodos);
router.get("/pokemonesPorId/:id", funciones.obtenerPorId);
router.post("/insertarPokemon", funciones.crear);
router.put("/pokeActualizar/:id", funciones.actualizar);
router.patch("/pokeActuParte/:id", funciones.actualizarParcial);
router.delete("/eliminarPoke/:id", funciones.eliminar);

module.exports = router;