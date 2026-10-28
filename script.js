
const orderButtons = document.querySelectorAll(" .product-card .product-button");

const whatsappNumber = "254700024206";

orderButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const shoeName = button.dataset.name;
    const shoePrice = button.dataset.price;

    const message = `Hello! I would like to order ${shoeName}, priced at KSh ${shoePrice}. Is it available?`;

    const whatsappLink =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  });
});






const cart = [];

const cartCount = document.querySelector("#cart-count");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");

const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

function renderCart() {
  cartItems.replaceChildren();

  let total = 0;

  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-cart";
    emptyMessage.textContent = "Your cart is empty.";
    cartItems.appendChild(emptyMessage);
  }

  cart.forEach(function(item, index) {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");

    
const name = document.createElement("strong");
name.textContent = item.name + " (Size " + item.size + ")";

const price = document.createElement("p");
price.textContent =
  "KSh " + item.price.toLocaleString("en-KE") +
  " × " + item.quantity;


const quantityControls = document.createElement("div");
quantityControls.className = "quantity-controls";

const decreaseButton = document.createElement("button");
decreaseButton.type = "button";
decreaseButton.textContent = "−";
decreaseButton.setAttribute("aria-label", "Decrease quantity");

const quantityDisplay = document.createElement("span");
quantityDisplay.textContent = item.quantity;

const increaseButton = document.createElement("button");
increaseButton.type = "button";
increaseButton.textContent = "+";
increaseButton.setAttribute("aria-label", "Increase quantity");

decreaseButton.addEventListener("click", function() {
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  renderCart();
});

increaseButton.addEventListener("click", function() {
  item.quantity += 1;
  renderCart();
});

quantityControls.append(
  decreaseButton,
  quantityDisplay,
  increaseButton
);



    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function() {
      cart.splice(index, 1);
      renderCart();
    });

    details.append(name, price);
row.append(details, quantityControls, removeButton);
cartItems.appendChild(row);
    
  });

  const totalItems = cart.reduce(function(sum, item) {
  return sum + item.quantity;
}, 0);

cartCount.textContent = totalItems;
  cartTotal.textContent = "KSh " + total.toLocaleString("en-KE");
}



addToCartButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const productCard = button.closest(".product-card");
    const sizeSelect = productCard.querySelector(".shoe-size");
    const selectedSize = sizeSelect.value;

    if (!selectedSize) {
      alert("Please select a shoe size first.");
      return;
    }

     const existingItem = cart.find(function(item) {
      return item.name === name && item.size === selectedSize;
    });

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1,
        size: selectedSize
      });
    }

    renderCart();
  });
});


     



checkoutButton.addEventListener("click", function() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add a shoe first.");
    return;
  }

  const orderLines = cart.map(function(item) {
    return `${item.name} (Size ${item.size}) × ${item.quantity} - KSh ${(item.price * item.quantity).toLocaleString("en-KE")}`;
  });

  const total = cart.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  const message =
    "Hello! I would like to order:\n" +
    orderLines.join("\n") +
    "\nTotal: KSh " + total.toLocaleString("en-KE");

  const whatsappNumber = "254700024206";

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappLink, "_blank");
});


renderCart();


const productSearch = document.querySelector("#product-search");
const categoryFilter = document.querySelector("#category-filter");
const productCards = document.querySelectorAll(".product-card");

function filterProducts() {
  const searchTerm = productSearch.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  productCards.forEach(function(card) {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    const productCategory =
      card.querySelector(".product-category").textContent.trim();

    const matchesSearch = productName.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" ||
      productCategory === selectedCategory;

    card.hidden = !(matchesSearch && matchesCategory);
  });
  const visibleProducts = Array.from(productCards).some(function(card) {
  return !card.hidden;
});

document.querySelector("#no-products-message").hidden = visibleProducts;
}

productSearch.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);


const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", function() {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
});

navLinks.querySelectorAll("a").forEach(function(link) {
  link.addEventListener("click", function() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.innerHTML =
      '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });
});

const clearCartButton = document.querySelector("#clear-cart-button");

clearCartButton.addEventListener("click", function() {
  if (cart.length === 0) {
    alert("Your cart is already empty.");
    return;
  }

  cart.length = 0;
  renderCart();
});



