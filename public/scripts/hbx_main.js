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












//
