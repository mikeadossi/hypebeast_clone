/* global $ */
/* exported populateShoppingBagView */

const populateShoppingBagView = () => {

  $(".localStorageShoppingBagContent")
    .append(`
        <div class="hbx_shopping_header_container">
          <div class="hbx_store_header_container">
            <ul class="hbx_header_left_links hbx_product_header_links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <img src="/images/hbx_images/general/arrow_right.png" alt="">
              </li>
            </ul>
          </div>
          <div class="hbx_shopping_title">
            Shopping Bag
          </div>
          <div class="product_footer_details_contact hbx_shopping_contact">
            <ul>
              <li>Have questions?</li>
              <li>
                <img class="contact_images" src="/images/hbx_images/general/speech_bubble_white.png" alt="">
                <span>Live Chat</span>
              </li>
              <li>
                <img class="contact_images" src="/images/hbx_images/general/mailing_envelope_white.png" alt="">
                <span>Email Us</span>
              </li>
              <li>
                <img class="contact_images" src="/images/hbx_images/general/phone_white.png" alt="">
                <span>Call Us</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="hbx_cart_flex_container">
          <div class="hbx_cart_left_column">
            <div class="hbx_cart_table">
              <ul class="hbx_cart_header">
                <li class="product_row">PRODUCT</li>
                <ul class="product_row_right">
                  <li>PRICE</li>
                  <li>QTY</li>
                  <li>TOTAL</li>
                </ul>
              </ul>
            </div>
            <div class="orderSummaryContent"></div>
            <div class="orderSummaryFooter"></div>
          </div>
          <div class="hbx_cart_right_column"></div>
        </div>
      `);

  $(".orderSummaryFooter").append(`
        <div class="hbx_update_container">
          <div class="hbx_update_btn" onclick="updateLocalStorageBag()">
            UPDATE BAG
          </div>
          <p class="no_edited_items">no edited items</p>
          <p class="edit_successful">edit successful!</p>
        </div>
    `);
};
