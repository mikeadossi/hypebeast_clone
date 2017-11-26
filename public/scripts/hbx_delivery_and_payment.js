const placeLocalStorageOrder = () => {
  let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
  let order_obj_value = $('.record_obj').val();
  let payment_type = $('input[name="payment_type"]:checked').val();

  fetch('/checkout/complete', {
    method:'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      'users_cart': hbxLocalCart,
      'order_obj_value':order_obj_value,
      'shipping_cost': 0,
      'payment_type': payment_type
    }),
    mode: 'cors',
    credentials: "same-origin",
    cache: 'default'
  })
  .then( () => {
    console.log('finished?');
    window.localStorage.removeItem(hbxLocalCart)
    return
  })
  .catch( err => console.log(err))
}
