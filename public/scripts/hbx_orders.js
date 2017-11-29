const closeOrderedItemModal = () => {
  let numOfRows = $('.modal_contents tr').length - 1;
  $('.hbx_ordered_item_modal').css("display","none");
  $('.hbx_modal_overlay').css("display","none");
  $(".modal_contents tr").slice(-numOfRows).remove();
}

const renderViewsModal = (id, purchased_product_details_array) => {


for(let i = 0; i < purchased_product_details_array.length; i++){
  $('.modal_contents tr:last').after(`
        <tr>
          <th class='modal_img'>
            <img src=`+purchased_product_details_array[i].item_image+` />
          </th>
          <th>`+purchased_product_details_array[i].item_brand+`</th>
          <th>`+purchased_product_details_array[i].item_name+`</th>
          <th>`+purchased_product_details_array[i].item_quantity+`</th>
          <th>`+purchased_product_details_array[i].item_individual_price+`</th>
          <th>`+purchased_product_details_array[i].item_cost+`</th>
        </tr>
    `)
}
  $('.hbx_modal_overlay').attr("style","display: block !important");
  $('.hbx_ordered_item_modal').attr("style","display: block !important");
}
