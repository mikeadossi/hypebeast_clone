/* global $ */
/* exported closeOrderedItemModal */

const closeOrderedItemModal = () => {
  let numOfRows = $(".modal_contents tr").length - 1;
  $(".hbx_ordered_item_modal").css("display","none");
  $(".hbx_modal_overlay").css("display","none");
  $(".modal_contents tr").slice(-numOfRows).remove();
};
