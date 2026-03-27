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
    image.className = "product-image";
    image.src = product.image.url;
    image.alt = product.image.alt;
    const title = document.createElement("h2");
    title.className = "product-title";
    title.textContent = product.title;
    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = `${product.price}`;
    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;
    const addCart = document.createElement("button");
    addCart.className = "add-cart";
    addCart.textContent = "Add to cart";

    specificProduct.appendChild(image);
    specificProduct.appendChild(title);
    specificProduct.appendChild(price);
    specificProduct.appendChild(description);
    specificProduct.appendChild(addCart);
    productCard.appendChild(specificProduct);
  } catch (error) {
    console.error("Failed to fetch product", error);
    productCard.textContent = "Failed to load product. Please try again later.";
  }
}

fetchProduct();
