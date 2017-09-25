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


// code for product carousel
let product_container = $(".product_container");
let product_on_display_container = $(".product_on_display_container")[0];
let product_preview_container = $(".product_preview_container")[0];

let product_preview_img;
let num_of_images = $(".product_preview_img").length;
let percent;

for(let i = 0; i < num_of_images; i++){
  product_preview_container.addEventListener("click", function(e) {
    product_preview_img = $(".product_preview_img")[i];
    if(e.target.parentElement === product_preview_img){
      console.log('e.target.parentElement -> ',e.target.parentElement);
      percent = i*100
      $(".product_on_display").css("right",percent+"%");
      $(".product_on_display").css("transition","1s");
    }
  })
}

// code for related products carousel

// let related_products = $(".related_products");
// let dotButtons = $(".dot_buttons");
// let num_of_slides = $(".dot_buttons").length;
// let percentage;
// let control_button;
//
// // for(let i = 0; i < num_of_slides; i++){
// for(let i = 0; i < 3; i++){
//   dotButtons[0].addEventListener("click", function(e) {
//     // product_preview_img = $(".product_preview_img")[i];
//     control_button = $(".dot_buttons")[i];
//     if(e.target.parentElement === control_button){
//       percentage = i*90
//       $(".related_products img").css("right",percentage+"%");
//       $(".related_products img").css("transition","1s");
//     }
//   })
// }
let product_slide;
let percentage;

let dotButtons = $(".dot_buttons span");
let dotButton2 = $(".dot_buttons span")[1];
console.log('dotButtons: ',dotButtons);
for(let i = 0; i < 3; i++){
  dotButtons[i].addEventListener("click", function(e){
    // product_slide = $(".dot_buttons span")[0];
    // if(e.target.parentElemnt === product_slide){
    console.log('e.target.parentElemnt: ',e.target.parentElemnt);
    console.log('e.target: ',e.target);
    percentage = i * 100
    $(".related_product_slides").css("right",percentage+"%");
    $(".related_product_slides").css("transition","1s");

    // console.log('product_slide: ',product_slide);
    // }
  })
}


// dotButtons[1].addEventListener("click", function(){
//   console.log('u');
// })














//
