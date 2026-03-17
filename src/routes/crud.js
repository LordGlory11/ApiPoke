const express = require("express");
const router = express.Router();

const funciones = require("../controller/crud");

// CRUD REST principal para /api/crud (Digimon)
router.get("/", funciones.todos);
router.get("/:id", funciones.soloporid);
router.post("/", funciones.insert);
router.put("/:id", funciones.put);
router.patch("/:id", funciones.pat);
router.delete("/:id", funciones.dele);

module.exports = router;