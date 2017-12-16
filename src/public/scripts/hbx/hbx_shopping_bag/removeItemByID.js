/* global window, confirm, fetch, Headers, document */
/* exported removeItemByID */

const removeItemByID = (item_id) => {
  let url = window.location.href;
  if (confirm("Are you sure you want to remove this item?")) {
    fetch("/remove-cart-item/"+item_id, {
      method:"DELETE",
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
      }),
    });
  }

  document.location.href = url;
};
