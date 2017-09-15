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
