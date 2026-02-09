const express = require('express');
const router = express.Router();
//si puedo dejas las mismas constantes ? y se pude usar mayusculas en las rutas?

const funciones = require('../controller/poke');

router.get("todosPokemones", funciones.Poketodos);

router.get("pokemonesPorId/:id", funciones.pokeporid);

router.post("insertarPokemon", funciones.pokeinsert);

router.put("pokeActualizar/:id", funciones.pokeput);

router.patch("pokeActuParte/:id", funciones.pokepat);

router.delete("eliminarPoke/:id", funciones.pokedele);

module.exports = router;