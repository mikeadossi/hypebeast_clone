/* global $, LIST_OF_EDITED_ITEMS, console, fetch, Headers, window, document,
confirm, renderAllCartItemsInPage, location,
populateShoppingBagView, createShoppingCartRightColumn, fetchRemoveCartItem,
fetchUpdateBag, LIST_OF_EDITED_ITEMS  */
/* exported addToListOfEditedItems, updateBag,
populateShoppingBagPageWithLocalStorageContent, removeItemByID */

// save the id for every item edited in the cart
const addToListOfEditedItems = (element, changeInValue) => {

  let container = element.parentNode;
  let containerParent = element.parentNode.parentNode.parentNode;
  let item_id = Number(container.children[3].innerHTML);
  let item_count = Number(container.children[1].innerHTML);
  let item_cost = containerParent.children[0].children[0].children[0].innerHTML;
  let item_tot_cost = item_cost * item_count;

  let editedItem = {};
  editedItem.id = item_id;
  editedItem.count = item_count;
  editedItem.tot_cost = item_tot_cost;

  for(let i = 0; i < LIST_OF_EDITED_ITEMS.length; i++){
    if(LIST_OF_EDITED_ITEMS[i].id === item_id){
      LIST_OF_EDITED_ITEMS[i].count = item_count;
      return;
    }
  }
  LIST_OF_EDITED_ITEMS.push(editedItem);

};



const populateShoppingBagPageWithLocalStorageContent = () => {

  $(".hbx_empty_cart_content").remove();

  populateShoppingBagView();

  let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);

  renderAllCartItemsInPage(hbxLocalCart);

  let bag_subtotal = 0;
  for(let i = 0; i < hbxLocalCart.length; i++){
    bag_subtotal += hbxLocalCart[i].item_cost;
  }

  createShoppingCartRightColumn(bag_subtotal);

};

const removeItemByID = (item_id) => {
  let url = window.location.href;
  if (confirm("Are you sure you want to remove this item?")) {
    fetch("/remove-cart-item/"+item_id, {
      method:"DELETE",
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
      }),
    });
  }

  document.location.href = url;
};
