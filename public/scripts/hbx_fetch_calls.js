
const post_cart_to_db = (cartItemsObj) => {
  console.log('posting?...');
  let url = window.location.href + '/add-to-cart';
  let myHeaders = new Headers();

  if(GLOBAL_USER){
    console.log('post global user...');
    console.log('P: ',GLOBAL_PRODUCT.id);
    console.log('U: ',GLOBAL_USER.id);
    fetch(url, {
      method:'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        product_quantity: cartItemsObj.product_quantity,
        product_cost: cartItemsObj.product_cost,
        product_color: cartItemsObj.product_color,
        product_size: cartItemsObj.product_size,
        product_id: GLOBAL_PRODUCT.id,
        users_id: GLOBAL_USER.id
      }),
      credentials: "same-origin"
    })
    // .then( (response) => response.json() /* transform data to json*/ )
    .then(() => {
      console.log('in it to win it');
      fetch_cart_contents_by_id(GLOBAL_USER.id);
      update_cart_icon_count_by_id(GLOBAL_USER.id);
    })
    .catch(err => console.log(err))
  }

}

const fetch_cart_contents_by_id = (user_id) => {
  // let url = '/get-cart-by-id/';
  let myHeaders = new Headers();

  fetch('/get-cart-by-id', {
    method:'GET',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'user_id': user_id
    }),
    mode: 'cors',
    credentials: "same-origin",
    cache: 'default'
  })
  .then( (cart) => {
    // convert cart response from readableStream type to json
    return cart.json();
  })
  .then((cartJSON) => {
    console.log('cartJSON: ',cartJSON)
  })
  .catch(err => console.log(err))

}

const update_cart_icon_count_by_id = (user_id) => {
  console.log('update cart icon count for user# ',user_id);
}