/* global fetch, Headers, $, console */
/* exported updateCartAndCountByID */

const updateCartAndCountByID = (user_id) => {

  fetch("/get-cart-by-id", {
    method:"GET",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "user_id": user_id
    }),
    mode: "cors",
    credentials: "same-origin",
    cache: "default"
  })
    .then( (cart) => {
      return cart.json();
    })
    .then((cartJSON) => {

      $(".shopping_bag")[0].innerHTML = 0;
      $(".shopping_bag_deux")[0].innerHTML = 0;

      if(cartJSON.length === 1){

        $(".shopping_bag")[0].innerHTML = cartJSON[0].item_quantity;
        $(".shopping_bag_deux")[0].innerHTML = cartJSON[0].item_quantity;
        $(".cart_price")[0].innerHTML = cartJSON[0].item_cost + ".00";
        $(".usd_cart_price")[0].innerHTML = cartJSON[0].item_cost;

        if($(".checkout_subtotal")){
          $(".checkout_subtotal")[0].innerHTML = cartJSON[0].item_cost;
        }
        if($(".bag_subtotal")){
          $(".bag_subtotal")[0].innerHTML = cartJSON[0].item_cost;
        }
        if(cartJSON[0].item_quantity > 1){
          $(".dropdown_item_count")[0].innerHTML = cartJSON[0].item_quantity + " Items";
          return;
        }
        $(".dropdown_item_count")[0].innerHTML = cartJSON[0].item_quantity + " Item";

      } else if (cartJSON.length > 1){
        let tot_cost = 0;
        let tot_quantity = 0;

        for(let i = 0; i < cartJSON.length; i++){
          tot_cost += cartJSON[i].item_cost;
          tot_quantity += cartJSON[i].item_quantity;
        }

        $(".shopping_bag")[0].innerHTML = tot_quantity;
        $(".shopping_bag_deux")[0].innerHTML = tot_quantity;
        $(".cart_price")[0].innerHTML = tot_cost + ".00";
        $(".usd_cart_price")[0].innerHTML = tot_cost;
        $(".dropdown_item_count")[0].innerHTML = tot_quantity + " Items";

        if($(".checkout_subtotal")){
          $(".checkout_subtotal")[0].innerHTML = tot_cost;
        }

        if($(".bag_subtotal")){
          $(".bag_subtotal")[0].innerHTML = tot_cost;
        }

      }

    })
    .catch(err => console.log(err));
};
