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
  product_preview_container.addEventListener("click", (e) => {
    product_preview_img = $(".product_preview_img")[i];
    if(e.target.parentElement === product_preview_img){
      percent = i*100
      $(".product_on_display").css("right",percent+"%");
      $(".product_on_display").css("transition","1s");
    }
  })
}

// code for related products carousel
let product_slide;
let percentage;

let dotButtons = $(".dot_buttons span");
let dotButton2 = $(".dot_buttons span")[1];

for(let i = 0; i < 3; i++){
  dotButtons[i].addEventListener("click", () => {
    percentage = i * 100
    $(".related_product_slides").css("right",percentage+"%");
    $(".related_product_slides").css("transition","1s");
  })
}


// const related_carousel_left_arrow = $(".related_carousel_left_arrow");
// const related_carousel_right_arrow = $(".related_carousel_right_arrow");
//
// related_carousel_left_arrow.on('click', () => {
//   $(".related_product_slides").css("left","100%");
//   $(".related_product_slides").css("transition","1s");
// })
//
// related_carousel_right_arrow.on('click', () => {
//   $(".related_product_slides").css("right","100%");
//   $(".related_product_slides").css("transition","1s");
// })













//
