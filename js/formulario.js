document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        const nombre = productForm.querySelector('#nombre').value;
        const precio = productForm.querySelector('#precio').value;
        const imagenUrl = productForm.querySelector('#imagenUrl').value;

        // Crear un objeto con los datos del producto
        const nuevoProducto = {
            nombre,
            precio,
            imagen_url: imagenUrl // Debes asegurarte de que la propiedad sea "imagen_url" para que coincida con la estructura en tu archivo db.json
        };

        // Enviar los datos del formulario al servidor utilizando Fetch API
        fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }
            return response.json();
        })
        .then(data => {
            console.log('Producto agregado correctamente:', data);
            // Aquí podrías realizar alguna acción adicional, como actualizar la lista de productos en la página
            // Puedes llamar a la función renderProductos() nuevamente con la lista actualizada de productos
        })
        .catch(error => {
            console.error('Error al agregar el producto:', error);
        });
    });
});
