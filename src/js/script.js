"use strict";

/*   ACCORDION
 */
const accordion = document.querySelector(".question-box-accordion");

accordion.addEventListener("click", (e) => {
  const item = e.target.closest(".question-box-accordion-item");

  const box = e.target.closest(".question-box-accordion-item-question");

  if (!box) return;
  if (box) {
    if (item.classList.contains("open")) {
      item.classList.remove("open");
    } else {
      item.classList.add("open");
    }
  }
});

/////////////////////////////////////////////////
/*   REVEAL SECTION
 */

const allSection = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.4,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

///////////////////////////////////////////////////////////////////
const cartItem = document.querySelector(".cart-box-middle");
const totalPriceEl = document.querySelector(".cart-box-low-total-box-price");
const cartSpan = document.querySelector(".cart-span");
const confrimBtn = document.querySelector(".cart-box-low-confrim-btn");
const overlay = document.querySelector(".overlay");

let state = {
  item: {},
  cart: [],
};

// EVENT LISTENER
document.querySelectorAll(".item-box").forEach((item) => {
  item.addEventListener("click", (e) => {
    const btn = e.target.classList.contains("btn-buy");

    if (!btn) return;

    const singleItem = e.target.closest(".single-item");
    const id = +singleItem.dataset.id;

    const name = singleItem.querySelector(".single-item-name").innerText;

    const image = singleItem
      .querySelector(".single-item-image")
      .getAttribute("src");

    const price = +singleItem.querySelector(".single-item-price").innerText;

    state.item = {
      id,
      name,
      image,
      price,
      quantity: 1,
    };

    let checkItem = state.cart.find((item) => item.id === state.item.id);

    if (checkItem) {
      checkItem.quantity++;
    } else {
      state.cart.push(state.item);
    }

    totalPrice(state.cart);
    addToCard(state.cart);
  });
});

//////////////////////////////////
// ADD TO CART
function addToCard(items) {
  cartItem.innerHTML = "";

  items.forEach((item) => {
    cartItem.innerHTML += `
    <div class="cart-box-middle-item"  data-id=${item.id}>
    <img
      class="cart-box-middle-item-image"
      src="${item.image}"
      alt="image"
    />
    <div class="cart-box-middle-item-info">
      <h4>${item.name}</h4>
      <p>$ <span>${item.price}</span></p>
      <button class="remove-btn">Remove</button>
    </div>
    <input type="number" min="1" value="${item.quantity}" />
    </div>
    `;

    sumQuantity(state.cart);
  });
}

function totalPrice(cart) {
  const amount = cart
    .map((item) => {
      return item.price * item.quantity;
    })
    .reduce((acc, prices) => acc + prices, 0);

  totalPriceEl.innerText = `${amount.toFixed(2)} USD`;
}

document.querySelector(".cart-box").addEventListener("change", (e) => {
  const item = e.target.closest(".cart-box-middle-item");
  const itemID = +item.dataset.id;
  let q = +item.querySelector("input").value;

  let product = state.cart.find((item) => item.id === itemID);
  product.quantity = q;
  console.log(product);
  totalPrice(state.cart);
});

document.querySelector(".cart-box").addEventListener("click", (e) => {
  const btn = e.target.classList.contains("remove-btn");

  if (!btn) return;

  const product = e.target.closest(".cart-box-middle-item");

  console.log(state.card);
  const itemID = +product.dataset.id;
  const index = state.cart.findIndex((item) => item.id === itemID);
  console.log("index", index);

  state.cart.splice(index, 1);

  cartSpan.innerText = state.cart.length;
  product.remove();
  totalPrice(state.cart);

  if (state.cart.length === 0) {
    cartItem.innerHTML = `<p class="cart-box-middle-item-empty-cart">
  There are not items in your cart.
</p>`;
  }
});

function sumQuantity(cart) {
  let arr = [];

  cart.map((item) => arr.push(item.quantity));
  arr = arr.reduce((acc, num) => acc + num, 0);

  cartSpan.innerText = `${arr}`;
}

/////////////////////////////////////////
/// SHOW HIDE CART
const showCartBtn = document.querySelector(".btn-cart");
const cartBox = document.querySelector(".cart-box");
const closeCartBtn = document.querySelector(".cart-box-top-btn");

showCartBtn.addEventListener("click", () => {
  cartBox.style.display = "flex";
  overlay.style.display = "block";
});

closeCartBtn.addEventListener("click", () => {
  cartBox.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  cartBox.style.display = "none";
  overlay.style.display = "none";
});

///////////////////////////////////////////////////////
// CONFRIM PURCHASE
confrimBtn.addEventListener("click", () => {
  if (state.cart.length > 0) {
    state.cart.length = 0;
    cartSpan.innerText = "0";

    totalPriceEl.innerText = "0.00 USD";

    cartItem.innerHTML = `<p class="cart-box-middle-item-empty-cart">
   Thank you for your purchase.
 </p>`;
  } else {
    cartItem.innerHTML = `<p class="cart-box-middle-item-empty-cart">
  First add items in your cart...
</p>`;
  }
});
