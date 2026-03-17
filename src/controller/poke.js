const db = require("../../db");

async function obtenerTodos(req, res) {
  try {
    const result = await db.query(
      "SELECT id, nombre, tipo FROM pokemon_simple ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener los Pokémon" });
  }
}

async function obtenerPorId(req, res) {
  const id = Number(req.params.id);
  try {
    const result = await db.query(
      "SELECT id, nombre, tipo FROM pokemon_simple WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Pokémon no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener el Pokémon" });
  }
}

async function crear(req, res) {
  const { id, nombre, tipo } = req.body;

  if (!nombre || !tipo) {
    return res
      .status(400)
      .json({ mensaje: "Nombre y tipo son obligatorios" });
  }

  try {
    let query;
    let params;
    if (id !== undefined && id !== null) {
      query =
        "INSERT INTO pokemon_simple (id, nombre, tipo) VALUES ($1, $2, $3) RETURNING id, nombre, tipo";
      params = [id, nombre, tipo];
    } else {
      query =
        "INSERT INTO pokemon_simple (nombre, tipo) VALUES ($1, $2) RETURNING id, nombre, tipo";
      params = [nombre, tipo];
    }

    const result = await db.query(query, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al crear el Pokémon" });
  }
}

async function actualizar(req, res) {
  const id = Number(req.params.id);
  const { nombre, tipo } = req.body;

  if (!nombre || !tipo) {
    return res
      .status(400)
      .json({ mensaje: "Nombre y tipo son obligatorios" });
  }

  try {
    const result = await db.query(
      "UPDATE pokemon_simple SET nombre = $1, tipo = $2 WHERE id = $3 RETURNING id, nombre, tipo",
      [nombre, tipo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Pokémon no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al actualizar el Pokémon" });
  }
}

async function actualizarParcial(req, res) {
  const id = Number(req.params.id);
  const { nombre, tipo } = req.body;

  try {
    const result = await db.query(
      "UPDATE pokemon_simple SET nombre = COALESCE($1, nombre), tipo = COALESCE($2, tipo) WHERE id = $3 RETURNING id, nombre, tipo",
      [nombre ?? null, tipo ?? null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Pokémon no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al actualizar parcialmente el Pokémon" });
  }
}

async function eliminar(req, res) {
  const id = Number(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM pokemon_simple WHERE id = $1 RETURNING id",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Pokémon no encontrado" });
    }
    res.json({ mensaje: "Pokémon eliminado correctamente", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al eliminar el Pokémon" });
  }
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  actualizarParcial,
  eliminar,
};
