/* global $, window */
/* exported updateLocalStorageCart */

// const updateLocalStorageCart = () => {
//
//   if(window.localStorage.hbxLocalCart){
//     let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
//     let totalNumOfItems = 0;
//
//     for(let i = 0; i < hbxLocalCart.length; i++){
//       totalNumOfItems += hbxLocalCart[i].item_quantity;
//     }
//
//     $(".shopping_bag")[0].innerHTML = totalNumOfItems;
//     $(".shopping_bag_deux")[0].innerHTML = totalNumOfItems;
//
//     if($(".no_items_in_bag").length || $(".new_arrivals_btn").length){
//       $(".no_items_in_bag")[0].remove();
//       $(".new_arrivals_btn")[0].remove();
//     }
//
//     $(".localStorageContent").empty();
//
//     $(".localStorageContent").append(`
//       <div class="items_in_bag">
//         <span class="dropdown_item_count">`+totalNumOfItems+` Item(s) in Bag</span>
//       </div>
//       <div class="dropdown_notice_top">
//         Please note: Item(s) is not reserved until checkout is completed.
//       </div>
//       <div class="cart_dropdown_product_container"></div>
//     `);
//
//     let order_total = 0;
//
//     for(let i = 0; i < hbxLocalCart.length; i++){
//       order_total += hbxLocalCart[i].item_cost;
//
//       $(".cart_dropdown_product_container").append(`
//           <div class="cart_product">
//             <div class="dropdown_img">
//               <img src=`+hbxLocalCart[i].item_image+` />
//             </div>
//             <div class="cart_product_container">
//               <div class="cart_product_brand">`+hbxLocalCart[i].item_brand+`</div>
//               <div class="cart_product_name">`+hbxLocalCart[i].item_name+`</div>
//               <div class="cart_size">Size: `+hbxLocalCart[i].item_size+`</div>
//               <div class="cart_notice">This item is excluded from promotions. </div>
//               <div class="quantity_and_price_container">
//                 <div class="quantity_and_price">
//                   <div class="quantity">
//                     <span class="qty"> Qty: </span>
//                     <span class="minus_item">-</span>
//                     <span class="item_count">
//                       `+hbxLocalCart[i].item_quantity+`
//                     </span>
//                     <span class="add_item">+</span>
//                   </div>
//                   <div class="dropdown_price">
//                     <span>USD</span>
//                     <span class="product_price">
//                       `+hbxLocalCart[i].item_cost+`.00
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           `);
//     }
//
//     $(".localStorageContent").append(`
//         <div class="dropdown_order_total_container">
//           <div class="dropdown_order_total">
//             <span class="order_tot">ORDER TOTAL</span>
//             <span>USD</span>
//             <span class="cart_price">`+order_total+`</span>
//           </div>
//         </div>
//         <div class="dropdown_notice">
//           <span>You will be charged in</span>
//           <span class="usd">USD</span>
//           <span class="usd_cart_price">`+order_total+`.00
//           </span>
//         </div>
//         <div class="dropdown_button_container">
//           <a class="view_bag" href="/hbx_shopping_bag">VIEW BAG</a>
//           <a class="checkout_now" href="/checkout/addressing">CHECKOUT NOW</a>
//         </div>
//         <div class="dropdown_notice dropdown_last_notice">
//           Have a Promotional Code or Gift Card? Add it in the Bag.
//         </div>
//     `);
//
//     return;
//   }
//
//   $(".shopping_bag")[0].innerHTML = 0;
//   $(".shopping_bag_deux")[0].innerHTML = 0;
// };
