const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3005;

app.use(bodyParser.json());

app.get("/contacts",async (req, res) =>
{
    try {
        
        const response = await axios.get("http://www.raydelto.org/agenda.php");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error : "Error obteniendo los contactos"});
    }
});

app.post("/contacts", async (req,res) =>{
    const {nombre, apellido, telefono } = req.body;

    if (!nombre || !telefono || !apellido) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." }); 
    }

    try {

        await axios.post("http://www.raydelto.org/agenda.php",{
            nombre,
            apellido,
            telefono,
        });

    res.status(201).json({message: "Contacto guardado con exito"});
        
    } catch (error) {
        res.status(500).json({ error: "Error al almacenar el contacto." });
        
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });