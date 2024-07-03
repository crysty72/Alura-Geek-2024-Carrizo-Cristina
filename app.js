const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir el uso de JSON en las solicitudes
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo db.json');
      return;
    }

    const productos = JSON.parse(data).productos;
    res.json(productos);
  });
});

// Ruta para eliminar un producto por su ID
app.delete('/productos/:id', (req, res) => {
  const productId = req.params.id;

  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo db.json');
      return;
    }

    let productos = JSON.parse(data).productos;
    const initialLength = productos.length;
    productos = productos.filter(producto => producto.id !== productId);

    if (productos.length === initialLength) {
      res.status(404).send('Producto no encontrado');
      return;
    }

    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify({ productos }, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al escribir en el archivo db.json');
        return;
      }

      res.sendStatus(204); // Envía una respuesta indicando que el producto fue eliminado
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
