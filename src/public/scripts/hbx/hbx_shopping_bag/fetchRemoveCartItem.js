/* global fetch, $, console, Headers, updateCartAndCountByID */
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
      // let user_id = $(".users_persistent_id")[0].innerHTML;
      // updateCartAndCountByID(user_id);
      console.log('removed cart item!');
    })
    .catch(err => console.log(err));

}
