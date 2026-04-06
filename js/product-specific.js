// specific product page - fetching the prouct which is clicked on
// by user

const productCard = document.querySelector("#product-card");
const reviews = document.querySelector("#reviews")
const apiUrl = "https://v2.api.noroff.dev/online-shop";

async function fetchProduct() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      productCard.textContent = "No ID provided!";
      return;
    }
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const product = data.data;
    const specificProduct = document.createElement("div");
    specificProduct.className = "specific-product";
    const image = document.createElement("img");
    image.className = "specific-image";
    image.src = product.image.url;
    image.alt = product.image.alt;
    const title = document.createElement("h1");
    title.className = "specific-title";
    title.textContent = product.title;
    function starRating(ratingValue = 0) {
       const rating = document.createElement("div")
      rating.className = "specific-rating"
      for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i")
      if (ratingValue >= i) {
        star.className = "fas fa-star"
      } else if (ratingValue >= i - 0.5) {
        star.className = "fas fa-star-half-alt"
      } else {
        star.className = "far fa-star"
      }
      rating.appendChild(star)
    }
    return rating
    }
    const productRating = starRating(product.rating || 0)
   
    const price = document.createElement("span");
    price.className = "original-price";
    const discountPrice = document.createElement("span")
    discountPrice.className = "discounted-price"
    if (product.discountedPrice < product.price) {
      price.innerHTML = `
      <span class="original-price old-price">${product.price} NOK</span>
      <span class="discounted-price">now ${product.discountedPrice}!</span>`
    } else {
      price.textContent = `${product.price} NOK`;
    }
    const description = document.createElement("p");
    description.className = "specific-description";
    description.textContent = product.description;
    // fix so that there is space after comma
    const tags = document.createElement("p")
    tags.textContent = `tags: ${product.tags.join(", ")}`
    const addCart = document.createElement("button");
    addCart.className = "add-cart hidden";
    addCart.textContent = "Add to cart";
    let token = localStorage.getItem("authToken");
    if (token) {
    addCart.classList.remove("hidden");
    }
    addCart.addEventListener("click", () => {
      let token = localStorage.getItem("authToken");
      if (!token) {
      return;
      }
      let cart = JSON.parse(localStorage.getItem("cart")) || []
      const existingProductIndex = cart.findIndex(item => item.id === product.id)
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1
      } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            discountedPrice: product.discountedPrice,
            image: product.image.url,
            quantity: 1
        })
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      addCart.classList.add("active")
      addCart.textContent = "✔ Added!"
      addCart.disabled = true
      setTimeout(() => {
        addCart.classList.remove("active")
        addCart.textContent = "Add to cart"
        addCart.disabled = false
      }, 3000)
    })
    const share = document.createElement("i")
    share.className = "fas fa-share"
    share.addEventListener("click", () => {
      const url = `${window.location.origin}/product?productId=${product.id}`
      navigator.clipboard.writeText(url)
      .then (() => {
        // later fix: textContent appears underneath icon with the copied message
        console.log("copied!")
        // also add setTimeOut for it to disappear after some time
      })
      .catch(err => {
        console.error("Failed to copy!", err)
      })
    })
    const specificContent = document.createElement("div");
    specificContent.className = "specific-content";

    specificContent.appendChild(title);
    specificContent.appendChild(productRating)
    specificContent.appendChild(price);
    specificContent.appendChild(description);
    specificContent.appendChild(tags)
    specificContent.appendChild(addCart);
    specificContent.appendChild(share)

    specificProduct.appendChild(image);
    specificProduct.appendChild(specificContent);
    productCard.appendChild(specificProduct);

    // reviews fetched outside the product card

    const reviewsDiv = document.createElement("div")
    reviewsDiv.className = "specific-reviews"
    reviews.appendChild(reviewsDiv)
    if (product.reviews.length === 0) {
      reviewsDiv.innerHTML = `
      <h2>Reviews:</h2>
      <p>No reviews yet</p>`
    } else {
      const reviewHeader = document.createElement("h2")
      reviewHeader.textContent = "Reviews:"
      reviewsDiv.appendChild(reviewHeader)
      product.reviews.forEach(review => {
        const userReview = document.createElement("div")
        userReview.className = "review"
        const user = document.createElement("p")
        user.textContent = review.username + " "
        const reviewText = document.createElement("p")
        reviewText.textContent = `"${review.description}"`
        const userRating = starRating(review.rating ?? 0)

        userReview.appendChild(user)
        userReview.appendChild(userRating)
        userReview.appendChild(reviewText)
        reviewsDiv.appendChild(userReview)
      })
    }
    
  } catch (error) {
    console.error("Failed to fetch product", error);
    productCard.textContent = "Failed to load product. Please try again later.";
  }
}

fetchProduct();
