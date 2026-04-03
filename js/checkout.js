// this will get the information from cart, needs to go through thouroughly
document.addEventListener("DOMContentLoaded", () => {
    const insideCart = document.getElementById("insideCart")
    const totalPrice = document.getElementById("total-price")

    let cart = []
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || []
    } catch(error) {
        console.error("Could not load cart from localStorage", error)
        cart = []
    }

    let total = 0

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity
        total += itemTotal
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
        price.textContent = `Price: ${item.price} NOK`

        itemDisplay.appendChild(image)
        itemDisplay.appendChild(title)
        itemDisplay.appendChild(quantity)
        itemDisplay.appendChild(price)

        insideCart.appendChild(itemDisplay)
    })

    totalPrice.textContent = `${total.toFixed(2)} NOK`

    const purchaseBtn = document.querySelector(".complete-btn")
    purchaseBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("cart")
        window.location.href = "../success/index.html"
    })
})