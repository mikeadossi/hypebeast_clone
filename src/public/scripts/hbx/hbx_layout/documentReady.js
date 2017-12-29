/* global document, $, updateCartAndCountByID, window,
populateShoppingBagPageWithLocalStorageContent, populateAddressCheckoutPage,
setTimeout, checkForEmptyLocalStorageCart */

$(document).ready(function(){

  if($(".hbx_layout_user_present").html()){
    if(!document.cookie){
      let user_id = $(".hbx_layout_user_present").html();
      document.cookie = "userCookie="+user_id+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";

      $(".hbx_successful_login_message").css("display","block");

      setTimeout(() => {
        $(".hbx_successful_login_message").fadeOut( "slow" );
      }, 2000);
    }
  }

  let user_id = document.cookie.split("userCookie=")[1];

  if(user_id){
    updateCartAndCountByID(user_id);
  } else if(!user_id && window.localStorage.hbxLocalCart){
    checkForEmptyLocalStorageCart();
    populateShoppingBagPageWithLocalStorageContent();
    populateAddressCheckoutPage();
  } else if(!user_id){
    $(".shopping_bag")[0].innerHTML = 0;
    $(".shopping_bag_deux")[0].innerHTML = 0;
    populateAddressCheckoutPage();
  }


});
