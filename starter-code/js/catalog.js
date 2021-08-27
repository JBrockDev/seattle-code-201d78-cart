/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);
/// ----------------------------- cart is an instance of a CART -------------------////
/// ------------------- use cmd/ctl f to look for words in your code ------------------///

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //DONE: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    const optionElement = document.createElement('option');
    // console.log(i);
    optionElement.value = Product.allProducts[i].name;
    optionElement.innerHTML = Product.allProducts[i].name;
    selectElement.appendChild(optionElement);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();
  /// --------------- at this point you know which item was picked from the list, how many ----------- ///
  // Do all the things ...
  addSelectedItemToCart();
  // you can theoretically add parameters/arguments to a function being called
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE: suss out the item picked from the select list
  const selectElement = document.getElementById('items');
  // console.log(selectElement.value);
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].name === selectElement.value) {
      // console.log(Product.allProducts[i]);
      let quantity = document.getElementById('quantity').value;
      let cartItem = new CartItem(Product.allProducts[i], quantity);
      // console.log(cartItem);
      cart.items.push(cartItem);
      i = Product.allProducts.length;
    }
  }
  const form = document.getElementById("catalog");
  form.reset();
  // console.log(cart);
  // DONE: get the quantity
  // DONE: using those, add one item to the Cart
}

// DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  const counterElem = document.getElementById('itemCount');
  counterElem.textContent = cart.items.length;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  const previewElem = document.getElementById('cartContents');
  previewElem.innerHTML = '';
  for (let i = 0; i < cart.items.length; i++) {
    const itemDivElem = document.createElement('div');
    previewElem.appendChild(itemDivElem);
    itemDivElem.classList.add("preview");
    const itemImageElem = document.createElement('img');
    itemImageElem.setAttribute("src", cart.items[i].product.filePath);
    itemDivElem.appendChild(itemImageElem);
    const itemNameElem = document.createElement('p');
    itemNameElem.textContent = "Name: " + cart.items[i].product.name + " Quantity: " + cart.items[i].quantity;
    itemDivElem.appendChild(itemNameElem);
  }
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
