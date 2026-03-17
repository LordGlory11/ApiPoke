const express = require("express");
const router = express.Router();

const funciones = require("../controller/poke");

// CRUD REST principal para /api/pokemon
router.get("/", funciones.obtenerTodos);
router.get("/:id", funciones.obtenerPorId);
router.post("/", funciones.crear);
router.put("/:id", funciones.actualizar);
router.patch("/:id", funciones.actualizarParcial);
router.delete("/:id", funciones.eliminar);

module.exports = router;