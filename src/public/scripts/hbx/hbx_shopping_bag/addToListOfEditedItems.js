/* global LIST_OF_EDITED_ITEMS */
/* exported addToListOfEditedItems */

const addToListOfEditedItems = (element) => {
  // here we save the id for every item edited in the cart

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

  LIST_OF_EDITED_ITEMS.push(editedItem);

};
