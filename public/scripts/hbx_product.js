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


//code for related products carousel
let product_slide;
let percentage;

let dotButtons = $(".dot_buttons span");
// console.log('hbx_main(line 75) dotButtons[0] => ',dotButtons[0]);

let position = 0;
let prev_position = 0;

for(let i = 0; i < 3; i++){
  dotButtons[i].addEventListener("click", () => {
    percentage = i * 100
    $(".related_product_slides").css("right",percentage+"%");
    $(".related_product_slides").css("transition","1s");
    position = percentage

    $(position_obj[prev_position]).attr('style', 'color: grey');
    $(position_obj[position]).attr('style', 'color: black !important');
    prev_position = position;
  })
}
