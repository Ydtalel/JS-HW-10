const productCollection = document.querySelectorAll('.product');
const cartProductsContainer = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');

function updateCartVisibility() {
  cart.classList.toggle('hidden', cartProductsContainer.children.length === 0);

  const cartItems = cartProductsContainer.querySelectorAll('.cart__product');
  const cartData = {};

  cartItems.forEach(item => {
    const productId = item.dataset.id;
    const quantity = item.querySelector('.cart__product-count').textContent;
    cartData[productId] = quantity;
  });

  localStorage.setItem('cart', JSON.stringify(cartData));
}

function loadCartFromStorage() {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    const cartItems = JSON.parse(cartData);
    for (const productId in cartItems) {
      const productDiv = document.querySelector(`.product[data-id="${productId}"]`);
      const img = productDiv.querySelector('img').src;
      const quantity = cartItems[productId];
      addToCart(productId, img, quantity);
    }
  }
}

loadCartFromStorage();
updateCartVisibility();

productCollection.forEach(product => {
  const incBtn = product.querySelector('.product__quantity-control_inc');
  const decBtn = product.querySelector('.product__quantity-control_dec');
  let quantity = product.querySelector('.product__quantity-value');
  const addToCartBtn = product.querySelector('.product__add');

  incBtn.addEventListener('click', () => {
    quantity.textContent = Number(quantity.textContent) + 1;
  });

  decBtn.addEventListener('click', () => {
    if (quantity.textContent > 1) {
      quantity.textContent = Number(quantity.textContent) - 1;
    }
  });

  addToCartBtn.addEventListener('click', () => {
    const existingCartItem = cartProductsContainer.querySelector(`.cart__product[data-id="${product.dataset.id}"]`);

    if (existingCartItem) {
      const cartProductQuantity = existingCartItem.querySelector('.cart__product-count');
      cartProductQuantity.textContent = Number(cartProductQuantity.textContent) + Number(quantity.textContent);
    } else {
      let productId = product.dataset.id;
      let img = product.querySelector('img').src;
      let quantityValue = quantity.textContent;
      addToCart(productId, img, quantityValue);
    }

    updateCartVisibility();
    quantity.textContent = 1;
  });
});

cartProductsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('cart__product-remove')) {
    const productFromCart = e.target.closest('.wrapper');
    productFromCart.remove();
    updateCartVisibility();
  }
});

function addToCart(id, img, quantity) {
  const newProductHTML = `
    <div class='wrapper'>
      <div class="cart__product" data-id="${id}">
        <img class="cart__product-image" src="${img}">
        <div class="cart__product-count">${quantity}</div>
      </div>
      <button class="cart__product-remove">Удалить товар</button>
    </div>
    `;
  cartProductsContainer.insertAdjacentHTML('beforeend', newProductHTML);
}

updateCartVisibility();
