// specific product page - fetching the prouct which is clicked on
// by user

const productCard = document.querySelector("#product-card");
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
    const rating = document.createElement("div")
    rating.className = "specific-rating"
    rating.textContent = ""
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i")
      if (product.rating >= i) {
        star.className = "fas fa-star"
      } else if (product.rating >= i - 0.5) {
        star.className = "fas fa-star-half-alt"
      } else {
        star.className = "far fa-star"
      }
      rating.appendChild(star)
    }
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
    const addCart = document.createElement("button");
    addCart.className = "add-cart";
    addCart.textContent = "Add to cart";
    const specificContent = document.createElement("div");
    specificContent.className = "specific-content";

    specificContent.appendChild(title);
    specificContent.appendChild(rating)
    specificContent.appendChild(price);
    specificContent.appendChild(description);
    specificContent.appendChild(addCart);

    specificProduct.appendChild(image);
    specificProduct.appendChild(specificContent);
    productCard.appendChild(specificProduct);
  } catch (error) {
    console.error("Failed to fetch product", error);
    productCard.textContent = "Failed to load product. Please try again later.";
  }
}

fetchProduct();
