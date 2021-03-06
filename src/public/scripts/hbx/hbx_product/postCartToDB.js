/* global window, fetch, Headers, GLOBAL_PRODUCT */
/* exported postCartToDB */

const postCartToDB = (cartItemsObj) => {

  let url = window.location.href + "/add-to-cart";

  return fetch(url, {
    method:"POST",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      item_quantity: cartItemsObj.item_quantity,
      item_cost: cartItemsObj.item_cost,
      item_color: cartItemsObj.item_color,
      item_size: cartItemsObj.item_size,
      products_id: GLOBAL_PRODUCT.id,
      item_category: cartItemsObj.item_category,
      item_image:cartItemsObj.item_image,
      item_name: cartItemsObj.item_name,
      item_individual_price: cartItemsObj.item_individual_price,
      item_brand: cartItemsObj.item_brand,
      item_route: cartItemsObj.item_route
    }),
    credentials: "same-origin"
  })
    .then( () => {
      return;
    });

};
