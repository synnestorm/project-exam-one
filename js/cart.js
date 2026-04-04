const containerCart = document.querySelector("#cart")
const productsCart = document.querySelector(".products-cart")
let cart = []
try {
    cart = JSON.parse(localStorage.getItem("cart")) || []
} catch(error) {
    console.error("Could not load cart", error)
    cart = []
}

function shoppingCart() {
    containerCart.innerHTML = ""
    if(cart.length === 0) {
        const emptyCart = document.createElement("p")
        emptyCart.className = "empty-cart"
        emptyCart.textContent = "Your shopping cart is currently empty:("
        containerCart.appendChild(emptyCart)
        productsCart.textContent = ""
        return
    }
    let total = 0
    cart.forEach((item) => {
        if (!item || (!item.price && item.discountedPrice) || !item.quantity) return;
        const finalPrice = item.discountedPrice ?? item.price;
        total += finalPrice * item.quantity;
        const displayProducts = document.createElement("div")
        displayProducts.className = "display-products"
        const productInfo = document.createElement("div")
        productInfo.className = "product-info"
        const image = document.createElement("img")
        image.className = "product-image"
        image.src = item.image
        image.alt = item.title
        const title = document.createElement("h2")
        title.className = "product-title"
        title.textContent = item.title
        const price = document.createElement("span")
        price.className = "product-price"
        const itemPrice = item.discountedPrice ?? item.price
        const itemTotal = itemPrice * item.quantity
        price.textContent = `${itemTotal.toFixed(2)} NOK`
        const removeBtn = document.createElement("button")
        removeBtn.className = "remove-btn"
        removeBtn.textContent = "Remove product"
        removeBtn.addEventListener("click", () => removeFromCart(item.id))

        //this is the quantity adjuster
        const quantityAdjuster = document.createElement("div")
        quantityAdjuster.className = "quantity-adjuster"
        const minus = document.createElement("button")
        minus.className = "quantity-btn"
        minus.textContent = "-"
        const quantityNumber = document.createElement("span")
        quantityNumber.textContent = item.quantity
        quantityNumber.className = "quantity-number"
        const plus = document.createElement("button")
        plus.className = "quantity-btn"
        plus.textContent = "+"
        
        quantityAdjuster.appendChild(minus)
        quantityAdjuster.appendChild(quantityNumber)
        quantityAdjuster.appendChild(plus)

        const minQuantity = 1
        const maxQuantity = 10

        minus.addEventListener("click", () => {
            if (item.quantity > minQuantity) {
                item.quantity--
                localStorage.setItem("cart", JSON.stringify(cart))
                shoppingCart()
            }
        })

        plus.addEventListener("click", () => {
            if (item.quantity < maxQuantity) {
                item.quantity++
                localStorage.setItem("cart", JSON.stringify(cart))
                shoppingCart()
            }
        })

        displayProducts.appendChild(image)
        displayProducts.appendChild(title)
        displayProducts.appendChild(quantityAdjuster)
        
        displayProducts.appendChild(price)
        displayProducts.appendChild(removeBtn)
        displayProducts.appendChild(productInfo)
        containerCart.appendChild(displayProducts)
    })
    const totalPrice = document.createElement("div")
    totalPrice.className = "total-price"
    totalPrice.textContent = `Total price: ${total.toFixed(2)} NOK`
    containerCart.appendChild(totalPrice)
    const removeAllBtn = document.createElement("button")
    removeAllBtn.className = "remove-all"
    removeAllBtn.textContent = "Remove all products"
    removeAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to remove all products?")) {
            clearCart()  
            } 
        })
    containerCart.appendChild(removeAllBtn)
    const continueBtn = document.createElement("button")
    continueBtn.className = "continue-btn"
    continueBtn.textContent = "Continue to checkout"
    continueBtn.addEventListener("click", () => {
        window.location.href = "../checkout/index.html"
        })
    
    containerCart.appendChild(continueBtn)
}

function removeFromCart(productId) {
    cart = cart.filter(item => !(item.id === productId))
    localStorage.setItem("cart", JSON.stringify(cart))
    shoppingCart()
}

function clearCart() {
    cart = []
    localStorage.setItem("cart", JSON.stringify(cart))
    shoppingCart()
}

shoppingCart()