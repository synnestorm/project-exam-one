/* fetch("https://v2.api.noroff.dev/online-shop")
  .then((res) => {
    console.log("STATUS:", res.status);
    console.log("OK:", res.ok);
    return res.json();
  })
  .then((data) => {
    console.log("DATA:", data);
    console.log("TOP-LEVEL KEYS:", Object.keys(data));
    data.data.forEach((product) => {
      console.log(product.title);
      console.log(product.image.url);
    });
  })
  .catch((error) => {
    console.error("FETCH ERROR:", error);
  }); */

fetch("https://v2.api.noroff.dev/online-shop")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("product-list");

    data.data.forEach((product) => {
      const card = document.createElement("div");

      card.innerHTML = `
        <img src="${product.image.url}" alt="${product.image.alt}">
        <h2>${product.title}</h2>
        <h3>${product.price}</h3>
        <p>${product.description}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("FETCH ERROR:", error);
  });
