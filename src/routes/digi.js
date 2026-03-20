const express = require("express");
const router = express.Router();

const funciones = require("../controller/digi");

router.get("/todosDigimones", funciones.obtenerdigi);
router.get("/digimonPorId/:id", funciones.obtenerdigiporid);
router.post("/insertarDigimon", funciones.creardigi);
router.put("/digiActualizar/:id", funciones.actualizardigi);
router.patch("/digiActuParte/:id", funciones.actualizarParcialdigi);
router.delete("/eliminarDigi/:id", funciones.eliminardigi);

module.exports = router;