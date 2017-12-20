/* global $ */
/* exported displayBagIsCurrentlyEmpty */

const displayBagIsCurrentlyEmpty = () => {

  $(".hbx_cart_flex_container").css("display","block");
  $(".hbx_shopping_header_container").html(" ");
  $(".hbx_cart_flex_container").html(" ");

  $(".hbx_cart_flex_container").append(`
    <div class="hbx_shopping_bag_content">
      <div class="hbx_empty_cart_content">
        <div class="shopping_bag_div">
          <img src="images/hbx_images/general/shopping_bag.png" />
        </div>
        <p class="empty_bag">Your bag is currently empty</p>
        <a class="continue_shopping" href="/store">Continue Shopping</a>
        <div class="empty_cart_disclaimer">
          "If you are trying to add items to your cart and it remains empty, you may have cookies disabled in your browser settings. If that's the case, please enable acceptance of cookies and try again."
        </div>
      </div>
    </div>
    `);
};
