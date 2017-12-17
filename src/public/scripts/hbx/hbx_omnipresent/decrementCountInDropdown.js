/* global console, decrementCount, fetch, Headers, updateCartDropDownPriceAndCount */
/* exported decrementCountInDropdown */

const decrementCountInDropdown = (element, num_ceiling) => {

  let selectedItemCost = element.parentNode.parentNode.parentNode.children[1].children[1].innerHTML;

  let count = element.parentNode.children[1].innerHTML;
  if(Number(count) === num_ceiling ){
    return;
  }

  let parent = element.parentNode.parentNode.parentNode.parentNode.parentNode;
  let item_brand = parent.children[0].innerHTML;
  let item_name = parent.children[1].innerHTML;
  let item_quantity = decrementCount(element,num_ceiling);
  let cost_per_item = parent.children[2].innerHTML;
  let item_cost = item_quantity * cost_per_item;


  return fetch("/update-product-count", {
    method:"POST",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      item_name: item_name,
      item_brand: item_brand,
      item_quantity: item_quantity,
      item_cost: item_cost
    }),
    credentials: "same-origin"
  })
    .then(() => {

      updateCartDropDownPriceAndCount(
        "decrement",
        cost_per_item,
        selectedItemCost,
        element
      );

    })
    .catch(err => console.log(err));

};
