document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.querySelector('.contenedor-productos');
  
    // Función para cargar y mostrar los productos desde el servidor
    const cargarYMostrarProductos = async () => {
        try {
            // Cambiado a la ruta del servidor Express en el puerto 3000
            const response = await fetch('http://localhost:3000/productos'); 
            const data = await response.json();
  
            // Limpia el contenedor de productos antes de agregar nuevos productos
            contenedorProductos.innerHTML = '';
  
            // Recorre cada producto en los datos y crea una tarjeta para cada uno
            data.forEach(producto => {
                const cardProducto = document.createElement('div');
                cardProducto.classList.add('card-producto');
  
                const figura = document.createElement('figure');
                const imagenProducto = document.createElement('img');
                imagenProducto.classList.add('imagen-producto');
                imagenProducto.src = producto.imagen_url;
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
                
                // Agrega un evento click a los iconos de basura para eliminar productos
                iconoBasura.addEventListener('click', async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/productos/${producto.id}`, {
                            method: 'DELETE'
                        });
                        if (response.ok) {
                            // Eliminar la tarjeta del producto de la interfaz de usuario
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
  
                // Agrega la tarjeta del producto al contenedor de productos
                contenedorProductos.appendChild(cardProducto);
            });
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };
  
    // Llama a la función para cargar y mostrar los productos cuando se cargue la página
    cargarYMostrarProductos();
});
