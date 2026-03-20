const db = require('../models/connection');

async function todos(req, res){
     try {
            const query = "SELECT * FROM usuarios";
            const resultado =  await db.query(query);
            res.json(resultado.rows); 
            
        } catch (err) {
            console.error(err);
            res.status(500).send("Error");
        }
}

async function soloporid(req, res){
    const { id } = req.params; 
        try {
            const query = "SELECT * FROM usuarios WHERE id = $1";
            const resultado = await db.query(query, [id]);
            
            res.json(resultado.rows[0]);
            
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al obtener el usuario");
        }
}

function insert(req, res){
     //console.log(req.body);
    try {
        const { usuario, password } = req.body;
        const query = "INSERT INTO usuarios VALUES ($1, $2)";
        db.query(query, [usuario, password]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al insertar datos");
    }
    res.send("Datos insertados"); 
}

function put(req, res){
    const { id } = req.params;
        const { usuario, password } = req.body; 
    
        try {
            
            const query = "UPDATE usuarios SET usuario = $1, password = $2 WHERE id = $3";
            db.query(query, [usuario, password, id]);
    
            res.json({
                mensaje: "Recurso actualizado con éxito",
                id: id
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al actualizar los datos");
        }
}

function pat(req, res){
    const { id } = req.params;
       const { password } = req.body; 
    
       try {
            
            const query = "UPDATE usuarios SET password = $1 WHERE id = $2";
            db.query(query, [password, id]);
    
            res.json({
                mensaje: "Contraseña actualizada con éxito",
                id: id
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error al actualizar la contraseña");
        }
}

function dele(req, res){
    const { id } = req.params; 

    try {
        const query = "DELETE FROM usuarios WHERE id = $1";
        db.query(query, [id]);

        res.json({
            mensaje: "Registro eliminado correctamente",
            id: id
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al intentar eliminar el registro");
    }
}

module.exports = {
    todos,
    soloporid,
    insert,
    put,
    pat,
    dele
}