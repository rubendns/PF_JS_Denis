let products = [];

// Funcion para cargar los datos de productos desde un data.json
const loadProductsFromJSON = () => {
  fetch("/js/data.json")
    .then((response) => response.json())
    .then((data) => {
      products = data
      saveProductsToLocalStorage(products)
      loadCartFromLocalStorage()
      displayProducts()
    })
    .catch((error) => container.innerHTML = retornarCardError())      
    }

// Funcion para guardar los productos en el localStorage
const saveProductsToLocalStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products))
}

// Inicializar la aplicación
loadProductsFromJSON()
