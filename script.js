// THE COZY CAFE - JAVASCRIPT

// CART FUNCTIONS

let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];

function saveCart() {
    localStorage.setItem("cafeCart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    alert("☕ " + name + " added to your cart! 🤎");
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty ☕</p>";
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </p>
                <p>Subtotal: ₹${itemTotal}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalElement.innerText = "₹" + total;

    const checkoutTotal = document.getElementById("checkout-total");
    if (checkoutTotal) {
        checkoutTotal.innerText = "₹" + total;
    }
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

function clearCart() {
    cart = [];
    saveCart();
    displayCart();
}


// CONTACT FORM

function sendMessage(event) {
    event.preventDefault();
    alert("Thank you for contacting The Cozy Cafe! 🤎");
    event.target.reset();
}


// CHECKOUT AND ORDER SUCCESS

function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty! Please add something first. ☕");
        return;
    }

    const customerName =
        document.getElementById("customer-name")?.value.trim() ||
        "Coffee Lover";

    const orderItems = cart.map(item =>
        item.name + " x " + item.quantity
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Thank you, " + customerName + "! 🤎\n\n" +
        "Your demo order has been placed successfully!\n\n" +
        "Your items:\n" + orderItems +
        "\n\nTotal: ₹" + total
    );

    cart = [];
    saveCart();

    window.location.href = "success.html";
}


// CUSTOMER REVIEWS

function submitReview(event) {
    event.preventDefault();

    const name = document.getElementById("reviewer-name").value;
    const rating = document.getElementById("review-rating").value;
    const message = document.getElementById("review-message").value;
    const reviewList = document.getElementById("review-list");

    if (!reviewList) return;

    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    reviewCard.innerHTML = `
        <h3>${escapeHTML(name)}</h3>
        <p>${"⭐".repeat(Number(rating))}</p>
        <p>${escapeHTML(message)}</p>
    `;

    reviewList.appendChild(reviewCard);

    alert("Thank you for sharing your review! 🤎");
    event.target.reset();
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


// MENU SEARCH

function searchMenu() {
    const searchInput = document.getElementById("menu-search");
    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase();
    const menuItems = document.querySelectorAll(".menu-item");
    let found = 0;

    menuItems.forEach(item => {
        const itemName = item.innerText.toLowerCase();

        if (itemName.includes(searchText)) {
            item.style.display = "";
            found++;
        } else {
            item.style.display = "none";
        }
    });

    const noResults = document.getElementById("no-results");

    if (noResults) {
        noResults.style.display = found === 0 ? "block" : "none";
    }
}


// DARK MODE

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("cafeDarkMode", isDark ? "enabled" : "disabled");
}

if (localStorage.getItem("cafeDarkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}


// LOADING SCREEN

window.addEventListener("load", function() {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(function() {
            loader.classList.add("hide");
        }, 2000);
    }
});


// WELCOME POPUP

window.addEventListener("load", function() {
    const popup = document.getElementById("welcome-popup");

    if (popup) {
        setTimeout(function() {
            const loader = document.getElementById("loader");

            if (!loader || loader.classList.contains("hide")) {
                popup.classList.add("show");
            }
        }, 2500);
    }
});

function closeWelcomePopup() {
    const popup = document.getElementById("welcome-popup");

    if (popup) {
        popup.classList.remove("show");
    }
}


// DISPLAY CART WHEN PAGE OPENS

displayCart();