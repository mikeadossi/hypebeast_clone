/* global fetch, console, Headers */
/* exported fetchRemoveCartItem */

const fetchRemoveCartItem = (listOfEditedItems) => {

  return fetch("/remove-cart-item/"+listOfEditedItems.id, {
    method:"DELETE",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      id: listOfEditedItems.id
    }),
    credentials: "same-origin"
  })
    .then(() => {
      console.log("removed cart item!");
    })
    .catch(err => console.log(err));

};
