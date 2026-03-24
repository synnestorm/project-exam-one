// fetching for product grid and showing 12 products that is "trending now", and carousel showing 3 products

const productGrid = document.querySelector("#product-grid");
const apiUrl = "https://v2.api.noroff.dev/online-shop";
let products = [];

async function fetchProductGrid() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    products = data.data;
    displayCarousel();
    displayTrendingNow();
  } catch (error) {
    console.error("Failed to fetch new arrivals", error);
    productGrid.textContent =
      "Could not fetch products trending now. Please try again later.";
  }
}

// carousel slideshow

function displayCarousel() {
  const carouselContainer = document.querySelector("#carousel-slider");
  const carouselProducts = products.slice(0, 3);

  carouselProducts.forEach((product, index) => {
    const slideDiv = document.createElement("div");
    slideDiv.className = "mySlides fade";
    slideDiv.style.display = index === 0 ? "block" : "none";
    slideDiv.innerHTML = `<img src="${product.image.url} class="carousel-img">
    <div class="carousel-btn">
    <a href="product/index.html?id=${product.id}" class="view-item">View Item</a>
    </div>`;

    carouselContainer.appendChild(slideDiv);
  });
}

// displaying the trending now onto page

function displayTrendingNow() {
  if (!products || products.length === 0) {
    productGrid.textContent = "No trending products to show.";
    return;
  }
  const trendingNow = products.slice(2, 14);
  productGrid.innerHTML = "";
  trendingNow.forEach((product) => {
    const trendingDiv = document.createElement("div");
    trendingDiv.className = "trending-products";
    const link = document.createElement("a");
    link.className = "trending-link";
    link.href = `product/index.html?id=${product.id}`;
    const image = document.createElement("img");
    image.className = "trending-image";
    image.src = product.image.url;
    image.alt = product.title;
    const trendingInfo = document.createElement("div");
    trendingInfo.className = "trending-info";
    const title = document.createElement("p");
    title.className = "trending-title";
    title.textContent = `${product.title}`;
    const price = document.createElement("span");
    price.className = "trending-price";
    price.textContent = `${product.price} NOK`;

    trendingInfo.appendChild(title);
    trendingInfo.appendChild(price);
    link.appendChild(image);
    trendingDiv.appendChild(link);
    trendingDiv.appendChild(trendingInfo);
    productGrid.appendChild(trendingDiv);
  });
}

fetchProductGrid();
