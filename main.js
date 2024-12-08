// Seleccion de los elementos
const btnCarrito = document.querySelector('.container-icon');
const contenedorCarritoProductos = document.querySelector('.container-cart-products');
const btnsAñadirAlCarrito = document.querySelectorAll('.info-product button'); // Todos los botones "Añadir al carrito"
const contadorProductos = document.querySelector('#contador-productos');
let productosEnCarrito = 0;

// Evento para abrir y cerrar el carrito al hacer clic en el icono
btnCarrito.addEventListener('click', () => {
    contenedorCarritoProductos.classList.toggle('hidden-cart');  // Mostrar/ocultar el carrito
});

// Función para añadir productos al carrito
btnsAñadirAlCarrito.forEach((btn) => {
    btn.addEventListener('click', () => {
        productosEnCarrito++;  // Aumentamos la cantidad de productos en el carrito
        contadorProductos.textContent = productosEnCarrito;  // Actualizamos el contador de productos
    });
});
