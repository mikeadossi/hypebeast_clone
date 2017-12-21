/* global $ */
/* exported renderAllCartItemsInPage */

const renderAllCartItemsInPage = (hbxLocalCart) => {

  for(let i = 0; i < hbxLocalCart.length; i++){

    let item_total_cost = hbxLocalCart[i].item_individual_price * hbxLocalCart[i].item_quantity;

    $(".orderSummaryContent").append(`
        <div class="hbx_product_row hbx_local_storage_item_at_index_`+i+`">
          <div class="cart_product_img">
            <img src=`+hbxLocalCart[i].item_image+` alt="">
          </div>
          <div class="cart_product_details_container">
            <div class="cart_product_brand">
              `+hbxLocalCart[i].item_name+`
            </div>
            <div class="cart_product_name">
              `+hbxLocalCart[i].item_category+`
            </div>
            <div class="cart_size">
              Size: `+hbxLocalCart[i].item_size+`
            </div>
            <div class="cart_notice">
              This item is excluded from promotions.
            </div>
          </div>
          <div class="hbx_right_rows">
            <div class="hbx_price_row">
              <div class="cart_price">
                USD
                <span>`+hbxLocalCart[i].item_individual_price+`</span>
                <span class="decimal_place">.00</span>
              </div>
            </div>
            <div class="hbx_quantity_row">
              <div class="hbx_quantity_control">
                <div class="cart_select_minus" onclick="decrementCount(this,0), addToListOfEditedItems(this, 'decrement')">
                  -
                </div>
                <div id="cart_count">
                  `+hbxLocalCart[i].item_quantity+`
                </div>
                <div class="cart_select_plus" onclick="incrementCount(this,5), addToListOfEditedItems(this, 'increment')">
                  +
                </div>
                <div class="hidden_cart_id">
                  `+hbxLocalCart[i].products_id+`
                </div>
              </div>
              <div class="cart_remove_items" onclick="removeLocalStorageItemAtIndex(`+i+`)">
                REMOVE
              </div>
            </div>
            <div class="hbx_total_row">
              <span class="hbx_total_usd">USD</span>
              <span class="hbx_total_price hbx_local_storage_item_cost_at_index_`+i+`">
                `+item_total_cost+`
                  .00</span>
            </div>
          </div>
        </div>
      `);
  }

};
