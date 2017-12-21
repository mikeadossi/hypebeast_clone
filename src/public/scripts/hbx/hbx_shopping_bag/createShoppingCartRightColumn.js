/* global $ */
/* exported createShoppingCartRightColumn */

const createShoppingCartRightColumn = (bag_subtotal) => {
  $(".hbx_cart_right_column").append(`
        <div class="hbx_right_main_container">
          <div class="hbx_shipping_notice"> USD $0 away from Free Shipping</div>
          <div class="hbx_right_container">
            <div class="order_summary_container">
              Order Summary
            </div>
            <div class="shopping_sale_container">
              <div class="bag_total">Bag Subtotal</div>
              <div class="bag_cost">
                <span class="usd">USD</span>
                <span class="bag_subtotal">`+bag_subtotal+`.00</span>
              </div>
            </div>
            <div class="shopping_sale_container">
              <div class="duty_total">*Duty/Tax</div>
              <div class="duty_cost">
                <span class="usd">USD</span>
                <span>0.00</span>
              </div>
            </div>
            <div class="shopping_sale_container">
              <div class="shipping_total">
                Shipping Total
              </div>
              <div class="shipping_cost">
                <span>Free Shipping</span>
              </div>
            </div>
            <div class="order_total_container">
              <div class="order_total">
                ORDER TOTAL
              </div>
              <div class="order_cost">
                <span class="usd">USD</span>
                <span class="checkout_subtotal">`+bag_subtotal+`.00</span>
              </div>
            </div>
            <div class="proceed_button_container">
              <a class="proceed_button" href="/checkout/addressing">
                PROCEED TO CHECKOUT
              </a>
            </div>
            <div class="promotional_container">
              <div class="duty_total">
                Have a promotional code?
              </div>
              <div class="duty_cost">
                <div class="fa fa-chevron-down"></div>
              </div>
            </div>
            <div class="promotional_container">
              <div class="duty_total">
                Have a Gift Card or Store Credit?
              </div>
              <div class="duty_cost">
                <div class="fa fa-chevron-down"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="learn_more">
          <span>Learn about our</span>
          <span class="blue_hover_text">Returns Policy</span>
          <span>and</span>
          <span class="blue_hover_text">Delivery & Shipping</span>
          <span>information</span>
        </div>
        <div class="taxes">
          *All tax & duties will be covered by us. If you are charged any duty/tax fees for your order, please send us a copy of the invoice so we can settle the charges.
        </div>
    `);
};
