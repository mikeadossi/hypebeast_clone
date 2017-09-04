
$('.hamburger').on('click', () => {
  $('.hamburger').css('display','none');
  $('.close').css('display','inline-block');
  $('.mobileMenu').css('display','block');
  $('.magnifierMobile').css('display','none');

});

$('.close').on('click', () => {
  $('.hamburger').css('display','inline-block');
  $('.close').css('display','none');
  $('.mobileMenu').css('display','none');
  $('.magnifierMobile').css('display','inline-block');
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
