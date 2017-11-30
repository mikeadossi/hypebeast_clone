// save the id for every item edited in the cart
const addToListOfEditedItems = (element, changeInValue) => {
  let container = element.parentNode;
  let containerParent = element.parentNode.parentNode.parentNode;
  let item_id = Number(container.children[3].innerHTML);
  let item_count = Number(container.children[1].innerHTML);
  let item_cost = containerParent.children[0].children[1].innerHTML
  let item_tot_cost = item_cost * item_count;
  let editedItem = {};
  editedItem.id = item_id;
  editedItem.count = item_count;
  editedItem.tot_cost = item_tot_cost;
  for(let i = 0; i < LIST_OF_EDITED_ITEMS.length; i++){
    if(LIST_OF_EDITED_ITEMS[i].id === item_id){
      LIST_OF_EDITED_ITEMS[i].count = item_count;
      return;
    }
  }
  LIST_OF_EDITED_ITEMS.push(editedItem);
}

const updateBag = () => {
  let url = window.location.href;

  for(let i = 0; i < LIST_OF_EDITED_ITEMS.length; i++){
    if(LIST_OF_EDITED_ITEMS[i].count === 0){
      fetch('/remove-cart-item/'+LIST_OF_EDITED_ITEMS[i].id, {
        method:'DELETE',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          id: LIST_OF_EDITED_ITEMS[i].id,
          item_count: LIST_OF_EDITED_ITEMS[i].count,
          item_tot_cost: LIST_OF_EDITED_ITEMS[i].tot_cost
        }),
        credentials: "same-origin"
      })
      .then(() => {
        let user_id = $('.users_persistent_id')[0].innerHTML;
        updateCartAndCountByID(user_id);
      })
      .catch(err => console.log(err))

    } else {
      fetch('/update-bag', {
        method:'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          id: LIST_OF_EDITED_ITEMS[i].id,
          item_count: LIST_OF_EDITED_ITEMS[i].count,
          item_tot_cost: LIST_OF_EDITED_ITEMS[i].tot_cost
        }),
        credentials: "same-origin"
      })
      .then(() => {
        let user_id = $('.users_persistent_id')[0].innerHTML;
        updateCartAndCountByID(user_id);
      })
      .catch(err => console.log(err))
    }
    }

    console.log('ok...');
  document.location.href = url;
}

const populateShoppingBagPageWithLocalStorageContent = () => {
  $('.hbx_empty_cart_content').remove();
  $('.localStorageShoppingBagContent').append(`
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
        <div class="hbx_shoppig_title">
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

    let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);

    for(let i = 0; i < hbxLocalCart.length; i++){
      let item_total_cost = hbxLocalCart[i].item_individual_price * hbxLocalCart[i].item_quantity
      $('.orderSummaryContent').append(`
        <div class="hbx_product_row">
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
              </div>
              <span>`+hbxLocalCart[i].item_individual_price+`.00</span>
            </div>
            <div class="hbx_quantity_row">
              <div class="hbx_quantity_control">
                <div class="cart_select_minus" onclick="decrementCount(this,0), addToListOfEditedItems(this, 'decrement')">
                  -
                </div>
                <div id="cart_count">
                  `+hbxLocalCart[i].item_quantity+`
                </div>
                <div class="cart_select_plus" onclick="incrementCount(this), addToListOfEditedItems(this, 'increment')">
                  +
                </div>
                <div class="hidden_cart_id">
                  `+hbxLocalCart[i].id+`
                </div>
              </div>
              <div class="cart_remove_items">
                REMOVE
              </div>
            </div>
            <div class="hbx_total_row">
              <span class="hbx_total_usd">USD</span>
              <span class="hbx_total_price">`+item_total_cost+`.00</span>
            </div>
          </div>
        </div>
      `);
    }

    let bag_subtotal = 0;
    for(let i = 0; i < hbxLocalCart.length; i++){
      bag_subtotal += hbxLocalCart[i].item_cost;
    }

    $('.orderSummaryFooter').append(`
        <div class="hbx_update_container">
          <div class="hbx_update_btn" onclick="updateBag()">
            UPDATE BAG
          </div>
        </div>
    `);

    $('.hbx_cart_right_column').append(`
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

}

const removeItemByID = (item_id) => {
  let url = window.location.href;
  if (confirm('Are you sure you want to remove this item?')) {
    console.log('removed!');
    fetch('/remove-cart-item/'+item_id, {
      method:'DELETE',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
    })
  }

  document.location.href = url
}
