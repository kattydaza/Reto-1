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
function addToCart(productId, buttonElement){
    const cantidadElement = document.getElementById(`cantidad-${productId}`);
    const quantity = parseInt(cantidadElement.textContent, 10);

    const existingProduct = cart.find(item => item.id === productId);

    if(existingProduct){
        existingProduct.quantity += quantity;
    }else{
        fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            const product = productos.find(p => p.id === productId);
            if(product) {
                cart.push({...product, quantity: quantity});
                displayCart();
            }
        })
        .catch(error => console.error('Error al obtener el producto', error));
    }
    
    buttonElement.style.display = 'none';

    const cantidadContainer = buttonElement.nextElementSibling;
    cantidadContainer.style.display = 'flex';

    const cardImgElement = buttonElement.closest('.cards__card').querySelector('.card__img');
    cardImgElement.classList.add('active');
}



/* Funcion para incrementar la cantidad de un producto*/

function incrementarProducto(productId){
    const cantidadElemento = document.getElementById(`cantidad-${productId}`);
    let cantidad = parseInt(cantidadElemento.textContent, 10);
    cantidad++;
    cantidadElemento.textContent = cantidad;

    const product = cart.find(item => item.id === productId);
    if(producto) {
        producto.quantity = cantidad;
    }
    displayCart();
}


/* Funcion para decrementar la cantidad de un producto */

function decrementarProducto(productId) {
    const cantidadElemento = document.getElementById(`cantidad-${productId}`);
    let cantidad = parseInt(cantidadElemento.textContent, 10);

    if(cantidad > 1) {
        cantidad --;
        cantidadElemento.textContent = cantidad;
    }else{
        cantidad = 0;

        cart = cart.filter(item => item.id !==productId);

        const cantidadContainer = cantidadElemento.parentElement;
        const buttonElement = cantidadContainer.previousElementSibling;
        cantidadContainer.style.display = 'none';
        buttonElement.style.display = 'inline-block';

        const cardImgElement = buttonElement.closest('.cards__card').querySelector('.card))img');
        cardImgElement.classList.remove('active');
    }

    const producto = cart.find(item => itemm.id === productId);
    if (producto) {
        producto.quantity = cantidad;
    }
    displayCart();
}
/* Funcion para eliminar un producto de un carrito */
function removefromCart(productId){
    cart = cart.filter(item => item.id !== productId);

    const cantidadcontainer = document.getElementById(`cantidad-${productId}`).parentElement;
    const buttonElement = cantidadcontainer.previousElementSibling;
    cantidadContainer.style.display = 'none';
    buttonElement.style.display = 'inline-block';

    const cantidadElemento = document.getElementById(`cantidad-${productId}`);
    cantidadElemento.textContent = 1;

    const cardImgElement = buttonElement.closest('.cards__card').querySelector('.card__img');
    cardImgElement.classList.remove('active');

    displayCart();
}

/* Funcion para mostrar los productos en el carrito */
function displayCart() {
    const cartList = document.querySelector('.cart-list__items');
    const cartHeader = document.querySelector('.cart-list h2');
    cartList.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = `
        <div class="items__img">
            <img> src="images/logo.png" alt="Comida">
        </div>
        <p>Tus compras aparecerán aquí</p>
        `;
    }else {
        cart.forEach(item => {
            total += item.precio * item.quantity;
            cartList.innerHTML +=`
            <div class="items__item">
                <h4>${item.nombre}</h4>
                <div class ="item__detalles">
                    <p>${itrm.quantity}x <span>$${item.precio.toFixed(2)}</span></p>
                    <p>$$${(item.precio.toFixed(2) * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${item.id})">
                        <i class="ri-close-circle-fill"></i>
                    </button>
                </div>
            </div>
            `;
        });

        const totalContainer = document.createElement('div');
        totalContainer.classList.add('item__total');
        totalContainer.innerHTML = `
        <div>
            <span>Total a cancelar: </span>
            <span class="total__monto"> $${total.toFixed(2)}</span>
        </div>
        <button class="btn" id="btn-checkout">realizar el pedido</button>
        `;
        cartList.appendChild(totalContainer);
    }

    const checkoutButton = document.getElementById('btn-checkout');
    if (checkoutButton) {
        //checkoutButton.addEventListener('click', mostrarModalPedido);
    }

    const totalItems = cart.reduce((acc,item) => acc + item.quantity, 0);
    cartHeader.textContent = `Tu carrito (${totalItems})`;
}
/* Funcion para cerrar el modal del pedido y resetear el estado del carrito */

loadProducts();

