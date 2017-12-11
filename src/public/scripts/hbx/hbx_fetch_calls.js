/* global $, postCartToDB, updateCartAndCountByID, closeHBXAccount, window,
console, GLOBAL_USER, fetch, Headers, document, confirm, GLOBAL_PRODUCT */
/* exported closeHBXAccount, postCartToDB */
const postCartToDB = (cartItemsObj) => {

  let url = window.location.href + "/add-to-cart";

  if(GLOBAL_USER){
    // let product_image_first_child = cartItemsObj.product_image.firstChild;
    // let product_image = product_image_first_child.getAttribute('src');

    // let product_image = cartItemsObj.product_image;

    fetch(url, {
      method:"POST",
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        item_quantity: cartItemsObj.item_quantity,
        item_cost: cartItemsObj.item_cost,
        item_color: cartItemsObj.item_color,
        item_size: cartItemsObj.item_size,
        products_id: GLOBAL_PRODUCT.id,
        users_id: GLOBAL_USER.id,
        item_category: cartItemsObj.item_category,
        item_image:cartItemsObj.item_image,
        item_name: cartItemsObj.item_name,
        item_individual_price: cartItemsObj.item_individual_price,
        item_brand: cartItemsObj.item_brand,
        item_route: cartItemsObj.item_route
      }),
      credentials: "same-origin"
    })
      .then( () => {
        updateCartAndCountByID(GLOBAL_USER.id);
      })
      .catch(err => console.log(err));
  }

};


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

const closeHBXAccount = () => {
  let password = $(".close_account_password_input").val();
  let userId = $("#hiddenUserId").html();

  if(!password){
    $("#close_account_error_message").html("please enter a password");
  }

  if(confirm("Are you sure you want to close your account?")){

    fetch("/hbx_account/close-account", {
      method:"DELETE",
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        user_id: userId,
        user_password: password
      }),
      mode: "cors",
      credentials: "same-origin",
      cache: "default"
    })
      .then( () => {
        let url = window.location.href.split("/hbx_account/")[0];
        let localStorage = window.localStorage;
        localStorage.clear();
        document.location.href = url + "/hbx_logout";
      })
      .catch(err => console.log(err));

  } else {
    return;
  }

};
