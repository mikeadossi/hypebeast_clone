/* global $ */

let product_preview_container = $(".product_preview_container")[0];

let product_preview_img;
let num_of_images = $(".product_preview_img").length;
let percent;

for(let i = 0; i < num_of_images; i++){
  product_preview_container.addEventListener("click", (e) => {
    product_preview_img = $(".product_preview_img")[i];
    if(e.target.parentElement === product_preview_img){
      percent = i*100;
      $(".product_on_display").css("right",percent+"%");
      $(".product_on_display").css("transition","1s");
    }
  });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


const position_obj = {"0":".circle_1","100":".circle_2","200":".circle_3"};
$(".circle_1").attr("style", "color: black !important");

$(".related_carousel_left_arrow").on("click", () => {
  $("circle_"+position_obj[position]).attr("style", "color: black !important");
  if(position > 0){
    position -= 100;
    $(".related_product_slides").css("right",position+"%");
    $(".related_product_slides").css("transition","1s");

    $(position_obj[position+100]).attr("style", "color: grey !important");
    $(position_obj[position]).attr("style", "color: black !important");
    prev_position = position;
  }
});

$(".related_carousel_right_arrow").on("click", () => {
  $("circle_"+position_obj[position]).attr("style", "color: black !important");
  if(position < 101){
    position += 100;
    $(".related_product_slides").css("right",position+"%");
    $(".related_product_slides").css("transition","1s");

    $(position_obj[position-100]).attr("style", "color: grey !important");
    $(position_obj[position]).attr("style", "color: black !important");
    prev_position = position;
  }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


let percentage;

let dotButtons = $(".dot_buttons span");

let position = 0;
let prev_position = 0;

for(let i = 0; i < 3; i++){
  dotButtons[i].addEventListener("click", () => {
    percentage = i * 100;
    $(".related_product_slides").css("right",percentage+"%");
    $(".related_product_slides").css("transition","1s");
    position = percentage;

    $(position_obj[prev_position]).attr("style", "color: grey");
    $(position_obj[position]).attr("style", "color: black !important");
    prev_position = position;
  });
}
