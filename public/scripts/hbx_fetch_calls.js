
const post_cart_to_db = (cartItemsObj) => {

  let url = window.location.href + '/add-to-cart';
  let myHeaders = new Headers();

  if(GLOBAL_USER){
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
    .then( () => {
      console.log('in it to win it');
      return;
    })
    .catch(err => console.log(err))
  }

}
