/* global fetch, Headers, $, console, updateLocalStorageCart */
/* exported updateCartAndCountByID */

const updateCartAndCountByID = (user_id) => {

  $(".dropdown_products_container").css("display","block");

  return fetch("/get-cart-by-id", {
    method:"GET",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "user_id": user_id
    }),
    mode: "cors",
    credentials: "same-origin",
    cache: "default"
  })
    .then( (cart) => {
      return cart.json();
    })
    .then((cartJSON) => {
      updateLocalStorageCart(cartJSON);

    })
    .catch(err => console.log(err));
};
