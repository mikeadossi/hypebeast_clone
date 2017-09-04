
$('.fa-bars').on('click', () => {
  $('.fa-bars').css('display','none');
  $('.fa-close').css('display','inline-block');
  $('.mobileMenu').css('display','block');
});

$('.fa-close').on('click', () => {
  $('.fa-bars').css('display','inline-block');
  $('.fa-close').css('display','none');
  $('.mobileMenu').css('display','none');
})

$('.navAccountContainer').hover(
  () => {
    $('.accountDropDown').css('display','block');
  }, () => {
    $('.accountDropDown').css('display','none');
  }
)

$('.navGlobeContainer').hover(
  () => {
    $('.globeDropDown').css('display','block');
  }, () => {
    $('.globeDropDown').css('display','none');
  }
)

$(window).resize(
  () => {
    if($(window).width() >= 700){
      $('.fa-close').css('display','none');
      $('.mobileMenu').css('display','none');
      $('.fa-bars').css('display','inline-block');
      console.log('-> ',$(window).width());
    }
  }
)
