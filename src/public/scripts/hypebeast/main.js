/* global $, document window, generateComments */

$(document).ready(function(){
  if( $(".allCommentsWithoutParents").val() && $(".allCommentsWithParents").val() ){
    generateComments(
      $(".allCommentsWithoutParents").val(),
      $(".allCommentsWithParents").val()
    );
  }

  if($(".usernameVal").html()){
    $(".reply_button").remove();
  }

  if($(".layout_user_present").html()){
    if(!document.cookie){
      let user_id = $(".layout_user_present").html();
      document.cookie = "userCookie="+user_id+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
  }

});

let top_ten_secret = $(".top_ten_secret").text();
var arr = top_ten_secret.split("**");
let title;

for(let i = 0; i <= 10; i++){
  title = arr[i];
  $(".top_ten_description"+i).html(title);
}

$(".hamburger").on("click", () => {
  $(".hamburger").css("display","none");
  $(".close").css("display","inline-block");
  $(".mobileMenu").css("display","block");
  $(".magnifierMobile").css("display","none");
});

$(".close").on("click", () => {
  $(".hamburger").css("display","inline-block");
  $(".close").css("display","none");
  $(".mobileMenu").css("display","none");
  $(".magnifierMobile").css("display","inline-block");
});

$(".magnifier").on("click", () => {
  $(".search_nav_container").css("display","block");
});

$(".magnifier_glass").on("click", () => {
  $(".search_nav_container").css("display","block");
});


$(".search_nav_close").on("click", () => {
  $(".search_nav_container").css("display","none");
});



$(".navAccountContainer").hover(
  () => {
    $(".accountDropDown").css("display","block");
  }, () => {
    $(".accountDropDown").css("display","none");
  }
);

$(".navGlobeContainer").hover(
  () => {
    $(".globeDropDown").css("display","block");
  }, () => {
    $(".globeDropDown").css("display","none");
  }
);

/* Nav bar hover behaviour */

$(".fashionNavLink").hover(
  () => {
    $(".fashionNavLink").css("background-color","#1E1E1E");
    $(".fashionNavLink").css("color","white");
    $(".fashion_dropdown").css("display","block");
  }, () => {
    $(".fashionNavLink").css("background-color","unset");
    $(".fashionNavLink").css("color","black");
    $(".fashion_dropdown").css("display","none");
  }
);

$(".footwearNavLink").hover(
  () => {
    $(".footwearNavLink").css("background-color","#1E1E1E");
    $(".footwearNavLink").css("color","white");
    $(".footwear_dropdown").css("display","block");
  }, () => {
    $(".footwearNavLink").css("background-color","unset");
    $(".footwearNavLink").css("color","black");
    $(".footwear_dropdown").css("display","none");
  }
);

$(".musicNavLink").hover(
  () => {
    $(".musicNavLink").css("background-color","#1E1E1E");
    $(".musicNavLink").css("color","white");
    $(".music_dropdown").css("display","block");
  }, () => {
    $(".musicNavLink").css("background-color","unset");
    $(".musicNavLink").css("color","black");
    $(".music_dropdown").css("display","none");
  }
);

$(".artsNavLink").hover(
  () => {
    $(".artsNavLink").css("background-color","#1E1E1E");
    $(".artsNavLink").css("color","white");
    $(".arts_dropdown").css("display","block");
  }, () => {
    $(".artsNavLink").css("background-color","unset");
    $(".artsNavLink").css("color","black");
    $(".arts_dropdown").css("display","none");
  }
);

$(".allSectionsNavLink").hover(
  () => {
    $(".allSectionsNavLink").css("background-color","#1E1E1E");
    $(".allSectionsNavLink").css("color","white");
    $(".all_sections_dropdown").css("display","block");
  }, () => {
    $(".allSectionsNavLink").css("background-color","unset");
    $(".allSectionsNavLink").css("color","black");
    $(".all_sections_dropdown").css("display","none");
  }
);

$(".returnToTop").on("click", () => {
  $("html,body").animate({ scrollTop: 0 }, "slow");
}
);

$(".returnToTop").css("display","none");

$(document).scroll(function() {
  const top = $(this).scrollTop();
  if (top > 800) {
    $(".returnToTop").fadeIn();
  } else {
    $(".returnToTop").fadeOut();3;
  }

  if ($(document).height() <= ($(window).height() + $(window).scrollTop())) {
    $(".returnToTop").fadeOut();
  }
});
