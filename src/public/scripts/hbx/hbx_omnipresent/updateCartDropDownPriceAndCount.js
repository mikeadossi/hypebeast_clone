/* global $ */
/* exported updateCartDropDownPriceAndCount */

const updateCartDropDownPriceAndCount = (
  decrementOrIncrement,
  cost_per_item,
  selectedItemCost,
  element
) => {

  let newItemCost;
  let newOrderTotal;
  let currentOrderTotal = Number($(".cart_price").text());
  let dropDownItemCount = $(".dropdown_item_count").text();
  let itemCount = Number(dropDownItemCount.split(" ")[0]);


  if(decrementOrIncrement === "increment"){
    newItemCost = Number(selectedItemCost) + Number(cost_per_item);
    newOrderTotal = currentOrderTotal + Number(cost_per_item);
    itemCount++;
  } else if(decrementOrIncrement === "decrement"){
    newItemCost = Number(selectedItemCost) - Number(cost_per_item);
    newOrderTotal = currentOrderTotal - Number(cost_per_item);
    itemCount--;
  }

  let newItemCountString;
  itemCount < 2 ? newItemCountString = "1 Item" : newItemCountString = itemCount+" Items";

  element.parentNode.parentNode.parentNode.children[1].children[1].innerHTML = newItemCost;
  $(".cart_price").html(newOrderTotal);
  $(".usd_cart_price").html(newOrderTotal);
  $(".shopping_bag").html(itemCount);
  $(".shopping_bag_deux").html(itemCount);
  $(".dropdown_item_count").html(newItemCountString);


};
