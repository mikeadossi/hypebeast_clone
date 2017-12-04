const updateLocalStorageCart = () => {

  if(window.localStorage.hbxLocalCart){
    let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
    let totalNumOfItems = 0;

    for(let i = 0; i < hbxLocalCart.length; i++){
      totalNumOfItems += hbxLocalCart[i].item_quantity;
    }

    $('.shopping_bag')[0].innerHTML = totalNumOfItems;
    $('.shopping_bag_deux')[0].innerHTML = totalNumOfItems;

    if($('.no_items_in_bag').length || $('.new_arrivals_btn').length){
      $('.no_items_in_bag')[0].remove();
      $('.new_arrivals_btn')[0].remove();
    }

    $('.localStorageContent').empty();

    $('.localStorageContent').append(`
      <div class="items_in_bag">
        <span class="dropdown_item_count">`+totalNumOfItems+` Item(s) in Bag</span>
      </div>
      <div class="dropdown_notice_top">
        Please note: Item(s) is not reserved until checkout is completed.
      </div>
      <div class="cart_dropdown_product_container"></div>
    `);

    let order_total = 0;

    for(let i = 0; i < hbxLocalCart.length; i++){
      order_total += hbxLocalCart[i].item_cost;

      $('.cart_dropdown_product_container').append(`
          <div class="cart_product">
            <div class="dropdown_img">
              <img src=`+hbxLocalCart[i].item_image+` />
            </div>
            <div class="cart_product_container">
              <div class="cart_product_brand">`+hbxLocalCart[i].item_brand+`</div>
              <div class="cart_product_name">`+hbxLocalCart[i].item_name+`</div>
              <div class="cart_size">Size: `+hbxLocalCart[i].item_size+`</div>
              <div class="cart_notice">This item is excluded from promotions. </div>
              <div class="quantity_and_price_container">
                <div class="quantity_and_price">
                  <div class="quantity">
                    <span class="qty"> Qty: </span>
                    <span class="minus_item">-</span>
                    <span class="item_count">
                      `+hbxLocalCart[i].item_quantity+`
                    </span>
                    <span class="add_item">+</span>
                  </div>
                  <div class="dropdown_price">
                    <span>USD</span>
                    <span class="product_price">
                      `+hbxLocalCart[i].item_cost+`.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `);
    }

    $('.localStorageContent').append(`
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
          <a class="checkout_now" href="/checkout/addressing">CHECKOUT NOW</a>
        </div>
        <div class="dropdown_notice dropdown_last_notice">
          Have a Promotional Code or Gift Card? Add it in the Bag.
        </div>
    `);

    return;
  }

  $('.shopping_bag')[0].innerHTML = 0;
  $('.shopping_bag_deux')[0].innerHTML = 0;
}


$(document).ready(function(){
  let user = $('.users_persistent_id').length
  if(user){
    let user_id = $('.users_persistent_id')[0].innerHTML;
    updateCartAndCountByID(user_id);
  } else if(!user && window.localStorage.hbxLocalCart){
    updateLocalStorageCart();
    populateShoppingBagPageWithLocalStorageContent();
    populateAddressCheckoutPage();
  } else if(!user){
    $('.shopping_bag')[0].innerHTML = 0;
    $('.shopping_bag_deux')[0].innerHTML = 0;
    populateAddressCheckoutPage();
  }

})


let currentSelectedSize;

const selectPreferredSize = (indexPos) => {

  let product_size_categories_arr = $('.hidden_product_sizes_arr')[0].innerHTML;
  // unaffirmed size buttons are transparent
  for(let i = 0; i < product_size_categories_arr.length; i++){
    $('.product_size_'+i).css('background-color','transparent')
    $('.product_size_'+i).css('color','black')
  }

  // affirmed size buttons are blackened
  $('.product_size_'+indexPos).css('background-color','black')
  $('.product_size_'+indexPos).css('color','white')

  // get selected size character, ex: 'S' or 'XL'
  currentSelectedSize = $('.product_sizes')[indexPos].innerHTML

  // allow cart entry once user has made a sizing choice
  $('.product_add_to_cart_button').css('background-color','#006FB9');
  $('.product_add_to_cart_button')[0].innerHTML = "PLEASE SELECT A SIZE"
  $('.product_add_to_cart_button').hover(function(){
    $(this).css('cursor','pointer','important');
  })

}

let itemsInCartObj = {};
const product_brand = $('.product_brand')[0].innerHTML;
const product_name = $('.product_name_left')[0].innerHTML;
let product_usd = $('.product_price_left')[0].innerHTML;
product_usd = product_usd.split(' ');
const product_price = Number(product_usd[1]);


const selectItemOrProceedToBag = (element) => {
  // move on to shopping bag page
  if(element.innerHTML == "PROCEED TO BAG"){
    let href = window.location.href;
    href = href.split('brands')
    href = href[0] + 'hbx_shopping_bag'
    window.location = href;
    return;
  };

  addSelectedItemsToCart();
};

const addSelectedItemsToCart = () => {
  let href = window.location.href;
  let product_quantity = Number($('.item_count_amt')[0].innerHTML)
  let product_cost = product_price * product_quantity;
  let product_category = $('.hidden_category').text();
  product_category = product_category.replace(/ /g,'');

  let product_image = $('.product_preview_img')[0].outerHTML;
  product_image = product_image.split('src=')[1].split("></div>")[0]
  product_image = product_image.replace(/['"]+/g, '');

  itemsInCartObj = {
    item_quantity: Number($('.item_count_amt')[0].innerHTML),
    item_cost: product_cost,
    item_color: $(".form-control option:selected").text(),
    item_name: product_name,
    products_id: GLOBAL_PRODUCT.id,
    item_brand: product_brand,
    item_image: product_image,
    item_route: href,
    item_category: product_category,
    item_individual_price: product_price
  };

  currentSelectedSize ? itemsInCartObj.item_size = currentSelectedSize.replace(/\s/g, '') : itemsInCartObj.item_size = null

  if($('.hidden_user').text()){
    // if user is logged in
    itemsInCartObj.user_id = GLOBAL_USER.id
    postCartToDB(itemsInCartObj);
    proceedToBag();
  } else {
    // if user is not registered but populating cart
    populateLocalStorage(itemsInCartObj);
    updateLocalStorageCart();
    proceedToBag();
  };
};

const populateLocalStorage = (itemsInCartObj) => {
  // ampersand characters need to be accounted for when saved in cookie object
  if(itemsInCartObj.item_name && itemsInCartObj.item_name.indexOf('&amp;') != -1){
    itemsInCartObj.item_name = itemsInCartObj.item_name.replace('&amp;','ampersand_char')
  };

  if(!window.localStorage.hbxLocalCart){
    window.localStorage.setItem( 'hbxLocalCart', "["+JSON.stringify(itemsInCartObj)+"]" );
  } else {
    let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
    hbxLocalCart.push(itemsInCartObj);
    window.localStorage.setItem( 'hbxLocalCart', JSON.stringify(hbxLocalCart) )
  };

};

const proceedToBag = () => {
  $('.product_add_to_cart_button').css('background-color','#5DB75C');
  $('.product_add_to_cart_button')[0].innerHTML = "PROCEED TO BAG";
  $('.proceed_to_bag_button')[0].innerHTML = "PROCEED TO BAG";
};
