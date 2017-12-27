/* global $, populateDropDownWithLocalStorageItems */
/* exported updateLocalStorageCart */

const updateLocalStorageCart = (cart) => {

  if(cart.length < 1){ return; }

  let totalNumOfItems = 0;
  let itemDetail;

  for(let i = 0; i < cart.length; i++){
    totalNumOfItems += cart[i].item_quantity;
  }

  if(totalNumOfItems > 0){
    $(".shopping_bag")[0].innerHTML = totalNumOfItems;
    $(".shopping_bag_deux")[0].innerHTML = totalNumOfItems;
  }

  if(totalNumOfItems === 1){
    itemDetail = "item";
  } else if(totalNumOfItems > 1){
    itemDetail = "items";
  }

  $(".localStorageContent").empty();

  $(".localStorageContent").append(`
    <div class="items_in_bag">
      <span class="dropdown_item_count">`+totalNumOfItems+" "+itemDetail+` in Bag</span>
    </div>
    <div class="dropdown_notice_top">
      Please note: Item(s) is not reserved until checkout is completed.
    </div>
    <div class="cart_dropdown_product_container"></div>
  `);

  populateDropDownWithLocalStorageItems(cart);

};
