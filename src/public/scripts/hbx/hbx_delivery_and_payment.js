/* global window, fetch, document, console, $, Headers */
/* exported placeLocalStorageOrder */
const placeLocalStorageOrder = () => {
  let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
  let order_obj_value = $(".record_obj").val();
  let payment_type = $("input[name=\"payment_type\"]:checked").val();

  let url = window.location.href;
  url = url.split("/checkout/delivery_and_payment")[0];
  let route = url + "/checkout/complete";

  fetch(route, {
    method:"POST",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      "users_cart": hbxLocalCart,
      "order_obj_value":order_obj_value,
      "shipping_cost": 0,
      "payment_type": payment_type
    }),
    credentials: "same-origin"
  })
    .then( () => {
      let storage = window.localStorage;
      storage.removeItem("hbxLocalCart");
      document.location.href = url + "/checkout/complete";
    })
    .catch( err => console.log(err));
};
