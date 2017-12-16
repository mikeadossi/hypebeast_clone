/* global fetch, $, console, Headers, updateCartAndCountByID */
/* exported fetchRemoveCartItem */
const fetchRemoveCartItem = (iterator, listOfEditedItems) => {

  fetch("/remove-cart-item/"+listOfEditedItems[iterator].id, {
    method:"DELETE",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      id: listOfEditedItems[iterator].id,
      item_count: listOfEditedItems[iterator].count,
      item_tot_cost: listOfEditedItems[iterator].tot_cost
    }),
    credentials: "same-origin"
  })
    .then(() => {
      let user_id = $(".users_persistent_id")[0].innerHTML;
      updateCartAndCountByID(user_id);
    })
    .catch(err => console.log(err));

}
