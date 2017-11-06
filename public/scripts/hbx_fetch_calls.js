
const post_cart_to_db = (cartItemsObj) => {
  console.log('cartItemsObj: ',cartItemsObj);
  let url = window.location.href + '/add-to-cart';
  let myHeaders = new Headers();

  fetch(url, {
    method:'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      product_size: cartItemsObj.product_size,
      product_count: cartItemsObj.product_count,
      product_color: cartItemsObj.product_color,
      product_id: GLOBAL_PRODUCT.id
    }),
    credentials: "same-origin"
  })
  .then( (response) => {
    console.log('in it to win it');
    // let headers = response.headers;
    // console.log('==> ',headers.get('content-length'));
    // return headers.get('content-length');
    // console.log('----> ',response.user);
    // return response.json();
  })
  .catch(err => console.log('err -> ',err))
  // .then( (data) => {
  //   console.log('data: ',data);
  // })

}
