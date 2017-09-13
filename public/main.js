let ace = $('.post_title_string').text()
console.log('ace: ',ace);
let windowsize = $(window).width();
console.log('windowsize: ',windowsize);
console.log('type of ace: ',typeof ace);
var arr = ace.split(",")
console.log('arr: ',arr);
let dynamic;

$(window).resize(function() {
    // if (document.documentElement.clientWidth >= 1024) {

      for(let i = 0; i <= 10; i++){
        // create a dynamic way of catching different classes (do both here and in the loop )
        // var title = arr[i];
        if($(window).width() >= 900){
          title = '900'
          $(".here"+i).html(title);
        } else if($(window).width() >= 762){
          title = '762'
          $(".here"+i).html(title);
        } else if ($(window).width() >= 400){
          title = '400'
          $(".here"+i).html(title);
        }

        // $(".here"+i).html(title);
      }

    // }
}).resize()



// if(windowsize > 760){
//   $(".here").text('ace');
// }
// pink - 400
// skyblue - 762
// red- 990

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

// $('.search_container').css('display','none');

$('.magnifier').on('click', () => {
  $('.search_nav_container').css('display','block');
})

$('.magnifier_glass').on('click', () => {
  $('.search_nav_container').css('display','block');
})


$('.search_nav_close').on('click', () => {
  $('.search_nav_container').css('display','none');
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

/* Nav bar hover behaviour */

$('.fashionNavLink').hover(
  () => {
    $('.fashionNavLink').css('background-color','#1E1E1E')
    $('.fashionNavLink').css('color','white')
    $('.fashion_dropdown').css('display','block');
  }, () => {
    $('.fashionNavLink').css('background-color','unset')
    $('.fashionNavLink').css('color','black')
    $('.fashion_dropdown').css('display','none');
  }
)

$('.footwearNavLink').hover(
  () => {
    $('.footwearNavLink').css('background-color','#1E1E1E')
    $('.footwearNavLink').css('color','white')
    $('.footwear_dropdown').css('display','block');
  }, () => {
    $('.footwearNavLink').css('background-color','unset')
    $('.footwearNavLink').css('color','black')
    $('.footwear_dropdown').css('display','none');
  }
)

$('.musicNavLink').hover(
  () => {
    $('.musicNavLink').css('background-color','#1E1E1E')
    $('.musicNavLink').css('color','white')
    $('.music_dropdown').css('display','block');
  }, () => {
    $('.musicNavLink').css('background-color','unset')
    $('.musicNavLink').css('color','black')
    $('.music_dropdown').css('display','none');
  }
)

$('.artsNavLink').hover(
  () => {
    $('.artsNavLink').css('background-color','#1E1E1E')
    $('.artsNavLink').css('color','white')
    $('.arts_dropdown').css('display','block');
  }, () => {
    $('.artsNavLink').css('background-color','unset')
    $('.artsNavLink').css('color','black')
    $('.arts_dropdown').css('display','none');
  }
)

$('.allSectionsNavLink').hover(
  () => {
    $('.allSectionsNavLink').css('background-color','#1E1E1E')
    $('.allSectionsNavLink').css('color','white')
    $('.all_sections_dropdown').css('display','block');
  }, () => {
    $('.allSectionsNavLink').css('background-color','unset')
    $('.allSectionsNavLink').css('color','black')
    $('.all_sections_dropdown').css('display','none');
  }
)

$('.returnToTop').on('click', () => {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  }
);

$(document).scroll(function() {
  const top = $(this).scrollTop();
  if (top > 800) {
    $('.returnToTop').fadeIn();
  } else {
    $('.returnToTop').fadeOut();3
  }

  if ($(document).height() <= ($(window).height() + $(window).scrollTop())) {
    $('.returnToTop').fadeOut();
  }
});



// $(window).scroll(function(e){
//   console.log();
//   if ($(window).scrollTop() >= 1939){
//     $('.sticky_ad_one').css({'position':'fixed', 'top':'20px'});
//   }
//   if ($(window).scrollTop() >= 3000 || $(window).scrollTop() < 1939 )
//   {
//     $('.sticky_ad_one').css({'position':'absolute'});
//   }
//
// });
