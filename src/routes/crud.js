const express = require('express');
const router = express.Router();

const funciones = require('../controller/crud');

router.get("todos",  funciones.todos);

router.get("porid/:id", funciones.soloporid);

router.post("insertar", funciones.insert);

router.put("actualizar/:id", funciones.put);

router.patch("actu/:id", funciones.pat);

router.delete("eliminar/:id", funciones.dele);

module.exports = router;