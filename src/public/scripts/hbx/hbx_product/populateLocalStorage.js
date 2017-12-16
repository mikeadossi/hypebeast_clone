/* global window */
/*  exported populateLocalStorage */

const populateLocalStorage = (itemsInCartObj) => {
  // ampersand characters need to be accounted for when saved in cookie object
  if(itemsInCartObj.item_name && itemsInCartObj.item_name.indexOf("&amp;") != -1){
    itemsInCartObj.item_name = itemsInCartObj.item_name.replace("&amp;","ampersand_char");
  }

  if(!window.localStorage.hbxLocalCart){
    window.localStorage.setItem( "hbxLocalCart", "["+JSON.stringify(itemsInCartObj)+"]" );
  } else {
    let hbxLocalCart = JSON.parse(window.localStorage.hbxLocalCart);
    hbxLocalCart.push(itemsInCartObj);
    window.localStorage.setItem( "hbxLocalCart", JSON.stringify(hbxLocalCart) );
  }

};
