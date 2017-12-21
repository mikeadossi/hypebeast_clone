/* global window, LIST_OF_EDITED_ITEMS, $, setTimeout, displayBagIsCurrentlyEmpty */
/* exported updateLocalStorageBag */

const updateLocalStorageBag = () => {
  let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);

  if(!LIST_OF_EDITED_ITEMS.length){
    $(".no_edited_items").css("display","block");
    setTimeout(() => {
      $(".no_edited_items").fadeOut( "slow" );
    }, 3000);
    return;
  }

  let hbxLocalCartLength = hbxLocalCart.length;

  for(let i = 0; i < hbxLocalCartLength; i++){
    for(let x = 0; x < LIST_OF_EDITED_ITEMS.length; x++){
      if(hbxLocalCart[i].products_id === LIST_OF_EDITED_ITEMS[x].id){
        hbxLocalCart[i].item_quantity = LIST_OF_EDITED_ITEMS[x].count;
        hbxLocalCart[i].item_cost = LIST_OF_EDITED_ITEMS[x].tot_cost;
      }

      $(".hbx_local_storage_item_cost_at_index_"+i).html(hbxLocalCart[i].item_cost+".00");

      if(hbxLocalCart[i].item_quantity === 0){
        hbxLocalCart.splice(i,1);
        $(".hbx_local_storage_item_at_index_"+i).css("display","none");
        hbxLocalCartLength--;
      }
    }
  }

  window.localStorage.setItem( "hbxLocalCart", JSON.stringify(hbxLocalCart) );

  if(!hbxLocalCart.length){
    displayBagIsCurrentlyEmpty();
  } else {
    $(".edit_successful").css("display","block");
    setTimeout(() => {
      $(".edit_successful").fadeOut( "slow" );
    }, 3000);
  }


};
