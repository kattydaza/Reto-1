/* Variables Globales */
let cantidad = 1;
let cart = [];

/* Carga de productos desde el archivos json */
async function loadProducts () {
    try{
        const response = await fetch('productos.json');
        const productos = await response.json();
        displayProductos(productos);
    }catch (error) {
        console.error('Error al cargar los productos', error);
    }
}
/* Funcion para mostrar los productos de DOM */
function displayProductos(productos){
    const productList = document.querySelector('.cards');
    productos.forEach(product => {
        const article = document.createElement('article');
        article.classList.add('cards__card');
        article.innerHTML = `
            <div class="card__img">
                <img src="${product.imagen}" alt="${product.nombre}" >
            </div>
            <div class="card__descripcion">
                <h4 class="descripcion__categoria">${product.categoria}</h4>
                <h2 class="descripcion__nombre">${product.nombre}</h2>
                <p class="descripcion__precio">${product.precio}</p>
            </div>
            <button onclick="addToCart(${product.id}, this)" class="card__btn-shop">
                <i class="ri-shopping-cart-2-fill"></i>
                Añadir al carrito
            </button>
            <div class="card__cantidad" id="card__cantidad-${product.id}">
                <button class = "cantidad__btn-remove" onclick="decrementarProducto(${product.id})">
                    <i class="ri-indeterminate-circle-line"></i>
                </button>
                <div class="cantidad__numero" id="cantidad-${product.id}" data-id="${product.id}">
                    1
                </div>
                <button class = "cantidad__btn-add" onclick="incrementarProducto(${product.id})">
                    <i class="ri-add-circle-line"></i>
                </button>
            </div>
        `;
        productList.appendChild(article);
    });
}
/* Funcion para añadir productos al carrito */

/* Funcion para incrementar la cantidad de un producto*/

/* Funcion para decrementar la cantidad de un producto */

/* Funcion para eliminar un producto de un carrito */

/* Funcion para mostrar los productos en el carrito */

/* Funcion para cerrar el modal del pedido y resetear el estado del carrito */

loadProducts ();


/* 
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

*/
