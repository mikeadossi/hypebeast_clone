/* global $, window, GLOBAL_USER, GLOBAL_PRODUCT, postCartToDB,
updateLocalStorageCart, populateLocalStorage */
/* exported selectPreferredSize, selectItemOrProceedToBag */


let currentSelectedSize;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const selectPreferredSize = (indexPos) => {

  let product_size_categories_arr = $(".hidden_product_sizes_arr")[0].innerHTML;
  // unaffirmed size buttons are transparent
  for(let i = 0; i < product_size_categories_arr.length; i++){
    $(".product_size_"+i).css("background-color","transparent");
    $(".product_size_"+i).css("color","black");
  }

  // affirmed size buttons are blackened
  $(".product_size_"+indexPos).css("background-color","black");
  $(".product_size_"+indexPos).css("color","white");

  // get selected size character, ex: 'S' or 'XL'
  currentSelectedSize = $(".product_sizes")[indexPos].innerHTML;

  // allow cart entry once user has made a sizing choice
  $(".product_add_to_cart_button").css("background-color","#006FB9");
  $(".product_add_to_cart_button")[0].innerHTML = "PLEASE SELECT A SIZE";
  $(".product_add_to_cart_button").hover(function(){
    $(this).css("cursor","pointer","important");
  });

};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

let itemsInCartObj = {};
const product_brand = $(".product_brand")[0].innerHTML;
const product_name = $(".product_name_left")[0].innerHTML;
let product_usd = $(".product_price_left")[0].innerHTML;
product_usd = product_usd.split(" ");
const product_price = Number(product_usd[1]);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const addSelectedItemsToCart = () => {

  let href = window.location.href;
  let product_quantity = Number($(".item_count_amt")[0].innerHTML);
  let product_cost = product_price * product_quantity;
  let product_category = $(".hidden_category").text();
  product_category = product_category.replace(/ /g,"");

  let product_image = $(".product_preview_img")[0].outerHTML;
  product_image = product_image.split("src=")[1].split("></div>")[0];
  product_image = product_image.replace(/['"]+/g, "");

  itemsInCartObj = {
    item_quantity: Number($(".item_count_amt")[0].innerHTML),
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

  currentSelectedSize ? itemsInCartObj.item_size = currentSelectedSize.replace(/\s/g, "") : itemsInCartObj.item_size = null;

  if($(".hidden_user_obj").text()){
    // if user is logged in
    itemsInCartObj.user_id = GLOBAL_USER.id;
    postCartToDB(itemsInCartObj);
    proceedToBag();
  } else {
    // if user is not registered but populating cart
    populateLocalStorage(itemsInCartObj);
    updateLocalStorageCart();
    proceedToBag();
  }
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


const proceedToBag = () => {
  $(".product_add_to_cart_button").css("background-color","#5DB75C");
  $(".product_add_to_cart_button")[0].innerHTML = "PROCEED TO BAG";
  $(".proceed_to_bag_button")[0].innerHTML = "PROCEED TO BAG";
};
