const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const btnComprar = document.getElementById("boton-Comprar")

// Funcion para verificar si el carrito está vacio
const isCartEmpty = () => {
    const savedCart = localStorage.getItem("cart")
    return !savedCart || JSON.parse(savedCart).length === 0
}

// Funcion para mostrar el carrito
const displayCart = () => {
    let total = 0

    if (isCartEmpty()) {
        cartItems.textContent = "El carrito está vacío."
    return
    }
    const savedCart = localStorage.getItem("cart")
    const cart = JSON.parse(savedCart)
    cartItems.innerHTML = ""
    cart.forEach((item) => {
        const cartItem = document.createElement("li")
        cartItem.textContent = `${item.modelo} - $${item.precio}`
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            removeFromCart(item.id); 
        })
        cartItem.appendChild(deleteButton)
        cartItems.appendChild(cartItem)
        total += item.precio
    })
    cartTotal.textContent = `$${total.toFixed(2)}`
}

// Funcion para eliminar un elemento del carrito
const removeFromCart = (productId) => {
    const index = cart.findIndex((item) => item.id === productId)
    if (index !== -1) {
        cart.splice(index, 1)
        displayCart()
        saveCartToLocalStorage()
        Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Producto eliminado del carrito!",
            showConfirmButton: false,
            timer: 2500,
        })
        setTimeout(() => {
            location.reload()
        }, 2500)
    }
}

// Funcion para finalizar la compra
btnComprar.addEventListener("click", () => {
    if (isCartEmpty()) {
        Swal.fire({
        position: "center",
        icon: "warning",
        title: "¡El carrito está vacío!",
        showConfirmButton: false,
        timer: 2500,
        })
        return
    }
    Swal.fire({
        title: "¿Confirmar la compra?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "CONFIRMAR",
        denyButtonText: "CANCELAR",
        customClass: {
        confirmButton: "bg-primary",
        denyButton: "bg-secondary",
        },
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Muchas gracias por su compra!",
            showConfirmButton: false,
            timer: 2500,
        })
        cart.length = 0
        localStorage.removeItem("cart")
        setTimeout(() => {
            redirectToIndex();
        }, 2500)
        }
    })
})

window.addEventListener("load", () => {
    loadCartFromLocalStorage()
    displayCart()
});
