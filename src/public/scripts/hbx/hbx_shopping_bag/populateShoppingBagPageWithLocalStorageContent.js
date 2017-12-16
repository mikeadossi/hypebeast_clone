/* global $, populateShoppingBagView, window, renderAllCartItemsInPage,
createShoppingCartRightColumn */
/* exported populateShoppingBagPageWithLocalStorageContent */

const populateShoppingBagPageWithLocalStorageContent = () => {

  $(".hbx_empty_cart_content").remove();

  populateShoppingBagView();

  let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);

  renderAllCartItemsInPage(hbxLocalCart);

  let bag_subtotal = 0;
  for(let i = 0; i < hbxLocalCart.length; i++){
    bag_subtotal += hbxLocalCart[i].item_cost;
  }

  createShoppingCartRightColumn(bag_subtotal);

};
