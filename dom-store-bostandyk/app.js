import { Store } from './Store.js';

const store = new Store([
  { name: 'Laptop', price: 1000, qty: 1 },
  { name: 'Mouse', price: 25, qty: 2 }
]);

const form = document.getElementById('add-product-form');
const productsList = document.getElementById('products-list');
const totalPriceEl = document.getElementById('total-price');

// 1. Рендеринг списка товаров
function render() {
  productsList.innerHTML = '';
  
  store.getItems().forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <input type="number" class="qty-input" data-name="${item.name}" value="${item.qty}" min="0" style="width: 60px;">
      </td>
      <td>
        <button class="btn-delete" data-name="${item.name}">Delete</button>
      </td>
    `;
    productsList.appendChild(tr);
  });

  totalPriceEl.textContent = store.total;
}

// 2. Валидация формы и добавление товара
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const qtyInput = document.getElementById('qty');

  const errorName = document.getElementById('error-name');
  const errorPrice = document.getElementById('error-price');
  const errorQty = document.getElementById('error-qty');

  errorName.textContent = '';
  errorPrice.textContent = '';
  errorQty.textContent = '';

  let isValid = true;

  if (!nameInput.value.trim()) {
    errorName.textContent = 'Name cannot be empty';
    isValid = false;
  }

  const priceVal = parseFloat(priceInput.value);
  if (isNaN(priceVal) || priceVal <= 0) {
    errorPrice.textContent = 'Price must be greater than 0';
    isValid = false;
  }

  const qtyVal = parseInt(qtyInput.value, 10);
  if (isNaN(qtyVal) || qtyVal < 0) {
    errorQty.textContent = 'Quantity must be 0 or more';
    isValid = false;
  }

  if (isValid) {
    store.add({
      name: nameInput.value.trim(),
      price: priceVal,
      qty: qtyVal
    });

    form.reset();
    render();
  }
});

// 3. Делегирование событий на таблицу (Delete & Change Qty)
productsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    const name = e.target.getAttribute('data-name');
    store.remove(name);
    render();
  }
});

productsList.addEventListener('input', (e) => {
  if (e.target.classList.contains('qty-input')) {
    const name = e.target.getAttribute('data-name');
    const newQty = parseInt(e.target.value, 10);
    if (!isNaN(newQty) && newQty >= 0) {
      store.updateQty(name, newQty);
      totalPriceEl.textContent = store.total;
    }
  }
});

// Первоначальный рендер
render();