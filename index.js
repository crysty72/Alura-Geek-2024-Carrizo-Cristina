document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.querySelector('.contenedor-productos');

    const cargarYMostrarProductos = async () => {
        try {
            const response = await fetch('http://localhost:3000/productos');
            const data = await response.json();

            contenedorProductos.innerHTML = '';

            data.forEach(producto => {
                const cardProducto = document.createElement('div');
                cardProducto.classList.add('card-producto');

                const figura = document.createElement('figure');
                const imagenProducto = document.createElement('img');
                imagenProducto.classList.add('imagen-producto');
                imagenProducto.src = producto.img; // Corregido aquí
                imagenProducto.alt = producto.nombre;

                const figcaption = document.createElement('figcaption');
                figcaption.classList.add('nombre-producto');
                figcaption.textContent = producto.nombre;

                figura.appendChild(imagenProducto);
                figura.appendChild(figcaption);

                const contenedorPrecio = document.createElement('span');
                contenedorPrecio.classList.add('contenedor-precio');

                const precio = document.createElement('p');
                precio.textContent = `$ ${producto.precio}`;

                const iconoBasura = document.createElement('img');
                iconoBasura.classList.add('trash-icon');
                iconoBasura.src = './src/icons8-basura-24.png';
                iconoBasura.alt = 'Eliminar producto';

                iconoBasura.addEventListener('click', async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/productos/${producto.id}`, {
                            method: 'DELETE'
                        });
                        if (response.ok) {
                            cardProducto.remove();
                            console.log('Producto eliminado correctamente');
                        } else {
                            console.error('Error al eliminar el producto');
                        }
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                    }
                });

                contenedorPrecio.appendChild(precio);
                contenedorPrecio.appendChild(iconoBasura);

                cardProducto.appendChild(figura);
                cardProducto.appendChild(contenedorPrecio);

                contenedorProductos.appendChild(cardProducto);
            });
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };

    cargarYMostrarProductos();
});
