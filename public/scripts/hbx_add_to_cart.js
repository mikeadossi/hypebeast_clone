const updateCartIcon = () => {
  if(document.cookie !== ''){
    let cookieString = document.cookie.split('=')[1];
    let cookieArray = JSON.parse(cookieString);

    let totalNumOfItems = 0;
    for(let i = 0; i < cookieArray.length; i++){
      totalNumOfItems += cookieArray[i].product_quantity;
    }

    $('.shopping_bag')[0].innerHTML = totalNumOfItems;
    $('.shopping_bag_deux')[0].innerHTML = totalNumOfItems;
  } 
}


$(document).ready(function(){

  $('.shopping_bag')[0].innerHTML = 0;
  $('.shopping_bag_deux')[0].innerHTML = 0;

  updateCartIcon();
})


let currentSelectedSize;
let product_size_categories_arr = $('.hidden_product_sizes_arr')[0].innerHTML;

const selectPreferredSize = (indexPos) => {

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


const addSelectedItemsToCart = () => {
  if(currentSelectedSize){
    // move on to shopping bag page

    if($('.product_add_to_cart_button')[0].innerHTML == "PROCEED TO BAG"){
      let href = window.location.href;
      href = href.split('brands')
      href = href[0] + 'hbx_shopping_bag'

      window.location = href;

    } else {
      // add to cart
      let product_quantity = Number($('.item_count_amt')[0].innerHTML)
      let product_cost = product_price * product_quantity;

      itemsInCartObj = {
        product_quantity: Number($('.item_count_amt')[0].innerHTML),
        product_cost: product_cost,
        product_color: $(".form-control option:selected").text(),
        product_size: currentSelectedSize.replace(/\s/g, ''),
        product_name: product_name,
        product_id: GLOBAL_PRODUCT.id,
        product_brand: product_brand
      }

      if($('.hidden_user').text()){
        console.log('posted to db!!!');
        itemsInCartObj.user_id = GLOBAL_USER.id

        if(document.cookie){
          let cookie = document.cookie;
          cookie = cookie.split('=')
          cookie = cookie[1];
          cookie = JSON.parse(cookie);

          for(let i = 0; i < cookie.length; i++){
            post_cart_to_db(cookie[i])
          }
        }
        document.cookie = '';
        post_cart_to_db(itemsInCartObj);
        updateCartIcon();
        proceedToBag();
      } else {
        populateCookie();
        updateCartIcon();
        proceedToBag();
      }

    }

  }
}

const populateCookie = () => {
  // ampersand characters need to be accounted for when saved in cookie object
  if(itemsInCartObj.product_name && itemsInCartObj.product_name.indexOf('&amp;') != -1){
    itemsInCartObj.product_name = itemsInCartObj.product_name.replace('&amp;','ampersand_char')
  }
  let itemsInCartString = JSON.stringify(itemsInCartObj);
  const expiryDate = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  const path = "; path=/";

  if(document.cookie == ''){
    document.cookie = "itemsInCart=["+itemsInCartString+"]"+expiryDate+path;
  } else {
    let cookie_obj = document.cookie.split(']');
    cookie_obj = cookie_obj[0].split(']');
    cookie_obj.splice(1,0,itemsInCartString);
    console.log( 'cookie_obj length ---------> ', typeof cookie_obj[1] )
    // console.log( 'cookie_obj length ---------> ', JSON.parse(cookie_obj) )
    cookie_obj = cookie_obj.join() + ']' + expiryDate + path;
    document.cookie = cookie_obj;
  }

  let cookie = document.cookie
  cookie = cookie.split('itemsInCart=')[1]
  cookie = JSON.parse(cookie)
  console.log('cookie ===> ',cookie.length);
}

const proceedToBag = () => {
  $('.product_add_to_cart_button').css('background-color','#5DB75C');
  $('.product_add_to_cart_button')[0].innerHTML = "PROCEED TO BAG";
}
