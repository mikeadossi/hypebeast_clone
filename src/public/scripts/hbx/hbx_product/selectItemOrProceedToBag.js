/* global window, addSelectedItemsToCart */
/* exported selectItemOrProceedToBag */

const selectItemOrProceedToBag = (element) => {
  // move on to shopping bag page
  if(element.innerHTML == "PROCEED TO BAG"){
    let href = window.location.href;
    href = href.split("brands");
    href = href[0] + "hbx_shopping_bag";
    window.location = href;
    return;
  }

  addSelectedItemsToCart();
};
