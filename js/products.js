// fetching to show all the products for eonline

const productList = document.querySelector("#product-list");
const apiUrl = "https://v2.api.noroff.dev/online-shop";
let products = [];

const loader = document.createElement("div")
loader.className = "loader"
loader.id = "loader"
loader.style.display = "none"
document.body.appendChild(loader)

async function fetchEveryProduct() {
  loader.style.display = "flex"
  await new Promise(r => setTimeout(r, 1000))
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    products = data.data;
    const params = new URLSearchParams(window.location.search);
    const filterCategory = params.get("category");
    if (filterCategory) {
      console.log("URL Category found:", filterCategory);
      products = products.filter(
        (product) =>
          product.tags &&
          product.tags.some(
            (tag) => tag.toLowerCase() === filterCategory.toLowerCase(),
          ),
      );
      const shopTitle = document.querySelector(".shop-title");
      if (shopTitle) {
        shopTitle.textContent = `Shop ${filterCategory}`;
      }
    }
    displayAllProducts();
  } catch (error) {
    console.error("Failed to fetch products.", error);
    productList.textContent =
      "Could not fetch products. Please try again later.";
  } finally {
    loader.style.display = "none"
  }
}

// will display all the products from API

function displayAllProducts() {
  if (!products || products.length === 0) {
    productList.textContent = "Could not show all products.";
    return;
  }
  productList.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-div";
    const link = document.createElement("a");
    link.className = "product-link";
    link.href = `../product/index.html?id=${product.id}`;
    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image.url;
    image.alt = product.title;
    const productInfo = document.createElement("div");
    productInfo.className = "product-info";
    const title = document.createElement("p");
    title.className = "product-title";
    title.textContent = `${product.title}`;
    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = `${product.price} NOK`;

    productInfo.appendChild(title);
    productInfo.appendChild(price);
    link.appendChild(image);
    productDiv.appendChild(link);
    productDiv.appendChild(productInfo);
    productList.appendChild(productDiv);
  });
}

fetchEveryProduct();
