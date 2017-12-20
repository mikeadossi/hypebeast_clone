/* global window, updateLocalStorageCart */
/* exported checkForEmptyLocalStorageCart */

const checkForEmptyLocalStorageCart = () => {

  let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);

  if(hbxLocalCart.length){
    updateLocalStorageCart(hbxLocalCart);
  }

};
