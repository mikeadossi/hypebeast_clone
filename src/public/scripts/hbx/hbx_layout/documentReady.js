/* global document, $, updateCartAndCountByID, updateLocalStorageCart, window,
populateShoppingBagPageWithLocalStorageContent, populateAddressCheckoutPage, setTimeout */

$(document).ready(function(){

  if( $(".hbx_successful_login_message").text() ){
    setTimeout(() => {
      $(".hbx_successful_login_message").fadeOut( "slow" );
    }, 2000);
  }

  let user = $(".users_persistent_id").length;
  if(user){
    let user_id = $(".users_persistent_id")[0].innerHTML;
    updateCartAndCountByID(user_id);
  } else if(!user && window.localStorage.hbxLocalCart){
    updateLocalStorageCart();
    populateShoppingBagPageWithLocalStorageContent();
    populateAddressCheckoutPage();
  } else if(!user){
    $(".shopping_bag")[0].innerHTML = 0;
    $(".shopping_bag_deux")[0].innerHTML = 0;
    populateAddressCheckoutPage();
  }

});
