// this will get the information from cart, needs to go through thouroughly
document.addEventListener("DOMContentLoaded", () => {
    const insideCart = document.getElementById("insideCart")

    let cart = []
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || []
    } catch(error) {
        console.error("Could not load cart from localStorage", error)
        cart = []
    }

    let total = 0

    cart.forEach(item => {
        if (!item || (!item.price && item.discountedPrice) || !item.quantity) return;
        const finalPrice = item.discountedPrice ?? item.price;
        total += finalPrice * item.quantity;
        const itemDisplay = document.createElement("div")
        itemDisplay.className = "item-display"
        const image = document.createElement("img")
        image.src = item.image
        image.alt = item.title
        image.className = "product-image"
        const title = document.createElement("p")
        title.className = "product-title"
        title.textContent = item.title
        const quantity = document.createElement("p")
        quantity.className = "product-quantity"
        quantity.textContent = `Quantity: ${item.quantity}`
        const price = document.createElement("span")
        price.className = "product-price"
        const itemPrice = item.discountedPrice ?? item.price
        const itemTotal = itemPrice * item.quantity
        price.textContent = `${itemTotal.toFixed(2)} NOK`

        itemDisplay.appendChild(image)
        itemDisplay.appendChild(title)
        itemDisplay.appendChild(quantity)
        itemDisplay.appendChild(price)

        insideCart.appendChild(itemDisplay)
    })
    const totalPrice = document.createElement("span")
    totalPrice.className = "total-price"
    totalPrice.textContent = `Total: ${total.toFixed(2)} NOK`
    insideCart.appendChild(totalPrice)
    const purchaseBtn = document.querySelector(".complete-btn")
    purchaseBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("cart")
        window.location.href = "../success/index.html"
    })
})