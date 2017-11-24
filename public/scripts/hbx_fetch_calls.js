
const post_cart_to_db = (cartItemsObj) => {

  let url = window.location.href + '/add-to-cart';

  if(GLOBAL_USER){
    // let product_image_first_child = cartItemsObj.product_image.firstChild;
    // let product_image = product_image_first_child.getAttribute('src');

    let product_image = cartItemsObj.product_image;
    console.log('product_image ===> ',product_image);
    console.log('typeof product_image ===> ',typeof product_image);

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
        users_id: GLOBAL_USER.id,
        product_category: cartItemsObj.product_category,
        product_image:cartItemsObj.product_image,
        product_name: cartItemsObj.product_name,
        product_individual_price: cartItemsObj.product_individual_price,
        product_brand: cartItemsObj.product_brand
      }),
      credentials: "same-origin"
    })
    .then((cart) => {
      update_cart_and_count_by_id(GLOBAL_USER.id);
    })
    .catch(err => console.log(err))
  }

}


const update_cart_and_count_by_id = (user_id) => {

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
    return cart.json();
  })
  .then((cartJSON) => {

    $('.shopping_bag')[0].innerHTML = 0;
    $('.shopping_bag_deux')[0].innerHTML = 0;

    if(cartJSON.length === 1){

      $('.shopping_bag')[0].innerHTML = cartJSON[0].item_quantity;
      $('.shopping_bag_deux')[0].innerHTML = cartJSON[0].item_quantity;
      $('.cart_price')[0].innerHTML = cartJSON[0].item_cost + '.00';
      $('.usd_cart_price')[0].innerHTML = cartJSON[0].item_cost;

      if($('.checkout_subtotal')){
        $('.checkout_subtotal')[0].innerHTML = cartJSON[0].item_cost;
      }
      if($('.bag_subtotal')){
        $('.bag_subtotal')[0].innerHTML = cartJSON[0].item_cost;
      }
      if(cartJSON[0].item_quantity > 1){
        $('.dropdown_item_count')[0].innerHTML = cartJSON[0].item_quantity + ' Items';
        return;
      }
      $('.dropdown_item_count')[0].innerHTML = cartJSON[0].item_quantity + ' Item';

    } else if (cartJSON.length > 1){
      let tot_cost = 0;
      let tot_quantity = 0;

      for(let i = 0; i < cartJSON.length; i++){
        tot_cost += cartJSON[i].item_cost;
        tot_quantity += cartJSON[i].item_quantity;
      }

      $('.shopping_bag')[0].innerHTML = tot_quantity
      $('.shopping_bag_deux')[0].innerHTML = tot_quantity
      $('.cart_price')[0].innerHTML = tot_cost + '.00';
      $('.usd_cart_price')[0].innerHTML = tot_cost;
      $('.dropdown_item_count')[0].innerHTML = tot_quantity + ' Items'

      if($('.checkout_subtotal')){
        $('.checkout_subtotal')[0].innerHTML = tot_cost;
      }

      if($('.bag_subtotal')){
        $('.bag_subtotal')[0].innerHTML = tot_cost;
      }

    }

  })
  .catch(err => console.log(err))
}
