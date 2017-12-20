/* exported populateDropDownWithLocalStorageItems */

const populateDropDownWithLocalStorageItems = (cart) => {

  let order_total = 0;

  for(let i = 0; i < cart.length; i++){

    order_total += cart[i].item_cost;

    $(".no_items_in_bag_container").html("");

    $(".cart_dropdown_product_container").append(`
        <div class="cart_product">
          <div class="dropdown_img">
            <img src=`+cart[i].item_image+` />
          </div>
          <div class="cart_product_container">
            <div class="cart_product_brand">`+cart[i].item_brand+`</div>
            <div class="cart_product_name">`+cart[i].item_name+`</div>
            <div class="cart_cost_per_product hidden_user">`+cart[i].item_individual_price+`</div>
            <div class="cart_size">Size: `+cart[i].item_size+`</div>
            <div class="cart_notice">This item is excluded from promotions. </div>
            <div class="quantity_and_price_container">
              <div class="quantity_and_price">
                <div class="quantity">
                  <span class="qty"> Qty: </span>
                  <span>
                    <span class="minus_item" onclick="decrementCountInDropdown(this,1)">-</span>
                    <span class="item_count">
                      `+cart[i].item_quantity+`
                    </span>
                    <span class="add_item" onclick="incrementCountInDropdown(this,5)">+</span>
                  <span>
                </div>
                <div class="dropdown_price">
                  <span>USD</span>
                  <span class="product_price">
                    `+cart[i].item_cost+`.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        `);
  }

  $(".localStorageContent").append(`
      <div class="dropdown_order_total_container">
        <div class="dropdown_order_total">
          <span class="order_tot">ORDER TOTAL</span>
          <span>USD</span>
          <span class="cart_price">`+order_total+`</span>
        </div>
      </div>
      <div class="dropdown_notice">
        <span>You will be charged in</span>
        <span class="usd">USD</span>
        <span class="usd_cart_price">`+order_total+`.00
        </span>
      </div>
      <div class="dropdown_button_container">
        <a class="view_bag" href="/hbx_shopping_bag">VIEW BAG</a>
        <a class="checkout_now" href="/checkout/addressing">CHECKOUT NOW//</a>
      </div>
      <div class="dropdown_notice dropdown_last_notice">
        Have a Promotional Code or Gift Card? Add it in the Bag.
      </div>
  `);

}
