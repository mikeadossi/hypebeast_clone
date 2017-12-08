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


const decrementCount = (element, num_floor) => {
  let container = element.parentNode;
  let number = Number(container.children[1].innerHTML);
  let decrement_element = container.children[0].className

  let increment_element = container.children[2].className;

  $('.'+increment_element).hover(function(){
    $(this).css('cursor','pointer');
  })

  if(number === num_floor){
    $('.'+decrement_element).hover(function(){
      $(this).css('cursor','not-allowed','important');
      return;
    })
  }

  if(number > num_floor && number <= 5){
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

  if(number <= 4){
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
