/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// DONE: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const tbodyElem = document.querySelector('tbody');
  tbodyElem.innerHTML = '';
}

// DONE: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  const tbodyElem = document.querySelector('tbody');
  for (let i = 0; i < cart.items.length; i++) {
    // console.log(cart.items);
    const rowElem = document.createElement('tr');
    tbodyElem.appendChild(rowElem);
    const deleteTDElem = document.createElement('td');
    rowElem.appendChild(deleteTDElem);
    deleteTDElem.textContent = 'delete';
    const quantityTDElem = document.createElement('td');
    rowElem.appendChild(quantityTDElem);
    quantityTDElem.textContent = cart.items[i].quantity;
    // console.log(cart.items);
    const itemTDElem = document.createElement('td');
    rowElem.appendChild(itemTDElem);
    itemTDElem.textContent = cart.items[i].product.name;
  }
  // DONE: Find the table body
  /// ------------------ querySelector ---------------------------///

  // DONE: Iterate over the items in the cart
  // DONE: Create a TR
  // DONE: Create a TD for the delete link, quantity,  and the item
  // DONE: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {
  // console.log(event.target.);
  // if (event.target.textContent === 'delete') {
  //   console.log('forward')
  // }
  console.log(event.target.parentNode.childNodes);
  if (event.target.parentNode.childNodes[0] === event.target) {
    for (let i = 0; i < cart.items.length; i++) {
      // console.log(cart.items[i]);
      let sibling = event.target.nextElementSibling;
      sibling = sibling.nextElementSibling;
      if (sibling.textContent === cart.items[i].product.name) {
        // console.log(cart.items[i]);
        cart.items.splice(i);
      }
      // console.log(sibling);
    }
    cart.saveToLocalStorage();
    clearCart();
    showCart();
    // console.log('delete')
  }
  // DONE: When a delete link is clicked, use cart.removeItem to remove the correct item
  // DONE: Save the cart back to local storage
  // DONE: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
