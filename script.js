// fetching for product grid, showing 12 products that is "trending now"

const productGrid = document.querySelector("product-grid");
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
    // call function displaying the fetched products
  } catch (error) {
    console.error("Failed to fetch new arrivals", error);
    productGrid.textContent =
      "Could not fetch products trending now. Please try again later.";
  }
}

const response = await fetch(apiUrl);
console.log(response.status, response.ok);

//     console.log(response.status, response.ok); <--- to check the response code
