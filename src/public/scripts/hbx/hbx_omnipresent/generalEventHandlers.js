/* global $, window */

$(".hbx_search").on("click", () => {
  $(".hbx_nav").append($(".hbx_search_mobile"));
  $(".hbx_search_mobile").toggle();
});

$(".hamburger_mobile").on("click", () => {
  $(".hbx_mobile_menu_background").css("display","block");
  // $('.hbx_scrollable_container').toggle( "slide" );
});

$(".hbx_mobile_menu_background").on("click", () => {
  $(".hbx_mobile_menu_background").css("display","none");
  // $('.hbx_scrollable_container').toggle( "slide" );
});

$( window ).resize(function() {
  if($(window).width() >= 769){
    $( ".hbx_search_mobile" ).css( "display","none" );
    $( ".hbx_mobile_menu_background" ).css( "display","none" );
  }
});

$(".cart_dropdown").css("display","none");

$("#bag_button").hover(
  () => {
    $(".cart_dropdown").css("display","block");
  }, () => {
    $(".cart_dropdown").css("display","none");
  }
);

$(window).scroll(function(){
  let sticky = $(".hbx_nav"),
    scroll = $(window).scrollTop();

  if (scroll >= 10) sticky.addClass("fixed_top");
  else sticky.removeClass("fixed_top");
});


$(".hbx_account_button").hover(
  () => {
    $(".hbxAccountMenu").css("display","block");
  }, () => {
    $(".hbxAccountMenu").css("display","none");
  }
);
