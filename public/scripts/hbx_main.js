$(document).ready(function(){
  if(document.cookie == ''){
    $('.shopping_bag')[0].innerHTML = 0;
    $('.shopping_bag_deux')[0].innerHTML = 0;
  } else {
    let cookieArray = document.cookie.split('=')[1];
    cookieArray = JSON.parse(cookieArray);
    let totalItems = 0;
    let itemCount;
    for(let i = 0; i < cookieArray.length; i++){
      itemCount = Number(cookieArray[i].product_count);
      totalItems += itemCount;
    }
    $('.shopping_bag')[0].innerHTML = totalItems;
    $('.shopping_bag_deux')[0].innerHTML = totalItems;
  }
})

$('.hbx_search').on('click', () => {
  $('.hbx_search_mobile').toggle();
});

$('.hamburger_mobile').on('click', () => {
  $('.hbx_mobile_menu_background').css('display','block');
  // $('.hbx_scrollable_container').toggle( "slide" );
});

$('.hbx_mobile_menu_background').on('click', () => {
  $('.hbx_mobile_menu_background').css('display','none');
  // $('.hbx_scrollable_container').toggle( "slide" );
});

$( window ).resize(function() {
  if($(window).width() >= 769){
    $( '.hbx_search_mobile' ).css( "display","none" );
    $( '.hbx_mobile_menu_background' ).css( "display","none" );
  }
});

// let displayMe = function(image_to_display){
//   $('.product_on_display').css("background-image",image_to_display);
// }


// $('select').on('change', function() {
//   let href = window.location.href;
//   href = href.split('/')
//   console.log('href: ',href);
//   let this_brand = href.pop();
//   href = href.join('/');
//   href = href+'/'+this_brand;
//   console.log('href popped: ',href);
//
//   if(this.value === 'high_to_low'){
//     console.log(href+'?sort=desc');
//     window.location=href+'?sort=desc';
//   } else if(this.value === 'low_to_high'){
//     console.log(href+'?sort=asc');
//     window.location=href+'?sort=asc';
//   } else if(this.value === 'newest_first'){
//     console.log(href);
//     window.location=href;
//   }
//
// })



const decrementCount = (element) => {
  let container = element.parentNode;
  let number = Number(container.children[1].innerHTML);
  let decrement_element = container.children[0].className

  let increment_element = container.children[2].className;

  $('.'+increment_element).hover(function(){
    $(this).css('cursor','pointer');
  })

  if(number === 1){
    $('.'+decrement_element).hover(function(){
      $(this).css('cursor','not-allowed','important');
    })
  } else if(number > 1){
    $('.'+increment_element).hover(function(){
      $(this).css('cursor','not-allowed','important');
    })
  }

  if(number > 1 && number <= 5){
    number -= 1;
    container.children[1].innerHTML = number;
  }
}

const incrementCount = (element) => {
  let container = element.parentNode;
  let number = Number(container.children[1].innerHTML);
  let decrement_element = container.children[0].className
  let increment_element = container.children[2].className;

  $('.'+decrement_element).hover(function(){
    $(this).css('cursor','pointer','important');
  })


  if(number === 5){
    $('.'+increment_element).hover(function(){
      $(this).css('cursor','not-allowed','important');
    })
  } else if(number < 5){
    $('.'+increment_element).hover(function(){
      $(this).css('cursor','pointer','important');
    })
  }

  if(number > 0 && number <= 4){
    number += 1;
    container.children[1].innerHTML = number;
  }

}


const position_obj = {'0':'.circle_1','100':'.circle_2','200':'.circle_3'}
$(".circle_1").attr('style', 'color: black !important');

$(".related_carousel_left_arrow").on('click', () => {
  $("circle_"+position_obj[position]).attr('style', 'color: black !important');
  if(position > 0){
    position -= 100;
    $(".related_product_slides").css("right",position+"%");
    $(".related_product_slides").css("transition","1s");
    console.log('position: ',position);
    $(position_obj[position+100]).attr('style', 'color: grey !important');
    $(position_obj[position]).attr('style', 'color: black !important');
    prev_position = position;
  }
})

$(".related_carousel_right_arrow").on('click', () => {
  $("circle_"+position_obj[position]).attr('style', 'color: black !important');
  if(position < 101){
    position += 100;
    $(".related_product_slides").css("right",position+"%");
    $(".related_product_slides").css("transition","1s");
    console.log('position: ',position);
    $(position_obj[position-100]).attr('style', 'color: grey !important');
    $(position_obj[position]).attr('style', 'color: black !important');
    prev_position = position;
  }
})

$('.cart_dropdown').css('display','none');

$('#bag_button').hover(
  () => {
    $('.cart_dropdown').css('display','block');
  }, () => {
    $('.cart_dropdown').css('display','none');
  }
)

$(window).scroll(function(){
  let sticky = $('.hbx_nav'),
      scroll = $(window).scrollTop();

  if (scroll >= 10) sticky.addClass('fixed_top');
  else sticky.removeClass('fixed_top');
});


$('.hbx_account_button').hover(
  () => {
    $('.hbxAccountMenu').css('display','block');
  }, () => {
    $('.hbxAccountMenu').css('display','none');
  }
)

let currentSelectedSize;
let item_count_amt = Number($('.item_count_amt')[0].innerHTML);

let product_size_categories_arr = $('.hidden_product_sizes_arr')[0].innerHTML;

const selectSize = (indexPos) => {

  for(let i = 0; i < product_size_categories_arr.length; i++){
    $('.product_size_'+i).css('background-color','transparent')
    $('.product_size_'+i).css('color','black')
  }

  $('.product_size_'+indexPos).css('background-color','black')
  $('.product_size_'+indexPos).css('color','white')

  currentSelectedSize = $('.product_sizes')[indexPos].innerHTML
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

    if($('.product_add_to_cart_button')[0].innerHTML == "PROCEED TO BAG"){
      let href = window.location.href;
      href = href.split('brands')
      href = href[0] + 'hbx_shopping_bag'

      window.location = href;

    } else {

      itemsInCartObj = {
        product_size: currentSelectedSize.replace(/\s/g, ''),
        product_count: item_count_amt,
        product_color: $(".form-control option:selected").text(),
        product_brand: product_brand,
        product_name: product_name,
        product_price: product_price
      }
      updateCart();
      proceedToBag();

    }

  }
}

const proceedToBag = () => {
  $('.product_add_to_cart_button').css('background-color','#5DB75C');
  $('.product_add_to_cart_button')[0].innerHTML = "PROCEED TO BAG";
}

const updateCart = () => {
  let itemsInCartString = JSON.stringify(itemsInCartObj);
  const expiryDate = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  const path = "; path=/";

  if(document.cookie == ''){
    document.cookie = "itemsInCart=["+itemsInCartString+"]"+expiryDate+path;
  } else {

    let cookie_obj = document.cookie.split(']');
    cookie_obj = cookie_obj[0].split(']');
    cookie_obj.splice(1,0,itemsInCartString);
    cookie_obj = cookie_obj.join() + ']' + expiryDate + path;
    document.cookie = cookie_obj;
  }

  let cookieArray = document.cookie.split('=')[1];
  cookieArray = JSON.parse(cookieArray);
  let totalItems = 0;
  let itemCount;
  for(let i = 0; i < cookieArray.length; i++){
    itemCount = Number(cookieArray[i].product_count);
    totalItems += itemCount;
  }
  $('.shopping_bag')[0].innerHTML = totalItems;
  $('.shopping_bag_deux')[0].innerHTML = totalItems;

}




const getCookieAtIndex = (index) => {
  // let cookie = document.cookie;
  // cookie = cookie.split(',');
  // console.log('cookie -> ', document.cookie);
  // for(let i = 0; i < cookie.length; i++){
  //   console.log('-> ',cookie[i]);
  // }
  // console.log('cookie boolean -> ',document.cookie == '');

  // console.log('cookie -> ',document.cookie);

}

// getCookieAtIndex();





//
