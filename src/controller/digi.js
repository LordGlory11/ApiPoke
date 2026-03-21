const db = require("../models/connection");

async function obtenerdigi(req, res) {
  try {
    const result = await db.query(
      "SELECT id, nombre, nivel, tipo FROM digimon_simple ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener los digimones" });
  }
}

async function obtenerdigiporid(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ mensaje: "El ID debe ser un número válido" });
  }
  try {
    const result = await db.query(
      "SELECT id, nombre, nivel, tipo FROM digimon_simple WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Digimon no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener el digimon" });
  }
}

function idNumericoValido(id) {
  if (id === undefined || id === null || id === "") return false;
  const n = Number(id);
  return Number.isInteger(n) && n > 0;
}

async function creardigi(req, res) {
  const { id, nombre, nivel, tipo } = req.body;

  if (!nombre || !nivel || !tipo) {
    return res
      .status(400)
      .json({ mensaje: "Nombre, nivel y tipo son obligatorios" });
  }

  try {
    let query;
    let params;
    if (idNumericoValido(id)) {
      query =
        "INSERT INTO digimon_simple (id, nombre, nivel, tipo) VALUES ($1, $2, $3, $4) RETURNING id, nombre, nivel, tipo";
      params = [Number(id), nombre, nivel, tipo];
    } else {
      query =
        "INSERT INTO digimon_simple (nombre, nivel, tipo) VALUES ($1, $2, $3) RETURNING id, nombre, nivel, tipo";
      params = [nombre, nivel, tipo];
    }

    const result = await db.query(query, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al crear el digimon" });
  }
}

async function actualizardigi(req, res) {
  const id = Number(req.params.id);
  const { nombre, nivel, tipo } = req.body;

  if (!nombre || !nivel || !tipo) {
    return res
      .status(400)
      .json({ mensaje: "Nombre, nivel y tipo son obligatorios" });
  }

  try {
    const result = await db.query(
      "UPDATE digimon_simple SET nombre = $1, nivel = $2, tipo = $3 WHERE id = $4 RETURNING id, nombre, nivel, tipo",
      [nombre, nivel, tipo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Digimon no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al actualizar el digimon" });
  }
}

async function actualizarParcialdigi(req, res) {
  const id = Number(req.params.id);
  const { nombre, nivel, tipo } = req.body;

  try {
    const result = await db.query(
      "UPDATE digimon_simple SET nombre = COALESCE($1, nombre), nivel = COALESCE($2, nivel), tipo = COALESCE($3, tipo) WHERE id = $4 RETURNING id, nombre, nivel, tipo",
      [nombre ?? null, nivel ?? null, tipo ?? null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Digimon no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al actualizar parcialmente el digimon" });
  }
}

async function eliminardigi(req, res) {
  const id = Number(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM digimon_simple WHERE id = $1 RETURNING id",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Digimon no encontrado" });
    }
    res.json({ mensaje: "Digimon eliminado correctamente", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al eliminar el digimon" });
  }
}

module.exports = {
  obtenerdigi,
  obtenerdigiporid,
  creardigi,
  actualizardigi,
  actualizarParcialdigi,
  eliminardigi,
};