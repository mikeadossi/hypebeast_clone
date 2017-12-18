/* global window, confirm, document */
/* exported removeLocalItemAtIndex */

const removeLocalStorageItemAtIndex = (index) => {
  let url = window.location.href;
  if (confirm("Are you sure you want to remove this item?")) {
    let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
    hbxLocalCart.splice(index,1);
    window.localStorage.setItem( "hbxLocalCart", JSON.stringify(hbxLocalCart) );
  }

  document.location.href = url;
};
