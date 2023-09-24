const cart = []
const productImage = document.getElementById("product-image")

// Funcion para cargar el carrito desde el localStorage
const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
        cart.push(...JSON.parse(savedCart)); // Agregar elementos del localStorage al carrito
    }
}

// Funcion para mostrar los productos en la pagina
const displayProducts = () => {
    const productsContainer = document.getElementById("products-container")
    productsContainer.innerHTML = ""
    products.forEach((product) => {
        const productCard = document.createElement("div")
        const productImage = document.createElement("img")
        productImage.src = product.imagen
        productImage.id = "product-image"
        productCard.appendChild(productImage)
        productCard.innerHTML += `
        <div class="card">
            <h4>${product.modelo}</h4>
            <p>Descripcion: ${product.descripcion}</p>
            <p>Precio: $${product.precio}</p>
            <button id="addToCart" onclick="addToCart(${product.id})">Agregar al Carrito</button> 
        </div>`    
        productsContainer.appendChild(productCard)
        saveCartToLocalStorage()
    })
}

// Funcion para guardar el carrito en el localStorage
const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// Funcion para agregar un producto al carrito
const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId)
    if (!product) {
        return
    }
    if (product.stock > 0) {
        cart.push(product)
        product.stock--
        displayProducts()
        Swal.fire({
            position: "center",
        icon: "success",
        title: "¡Producto agregado \n al carrito!",
        showConfirmButton: false,
        timer: 2000,
        })
    } else {
        Swal.fire({
        position: "top",
        icon: "warning",
        title: "¡Producto agotado!",
        showConfirmButton: false,
        timer: 1500,
        })
    }
}

// Funcion por si falla la carga de datos
function returnError() {
    return `<div class="card-error">
                <h2>⛔ Error al cargar los datos ⛔</h2>
            </div>`
}
// Funciones para redirigir paginas
const redirectToCheckout = () => {
    window.location.href = "checkout.html"
}
const redirectToIndex = () => {
    window.location.href = "index.html"
}
