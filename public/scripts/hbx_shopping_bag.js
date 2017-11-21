// save the id for every item edited in the cart
const addToListOfEditedItems = (element, changeInValue) => {
  let container = element.parentNode;
  let containerParent = element.parentNode.parentNode.parentNode;
  let item_id = Number(container.children[3].innerHTML);
  let item_count = Number(container.children[1].innerHTML);
  let item_cost = containerParent.children[0].children[1].innerHTML
  let item_tot_cost = item_cost * item_count;
  let editedItem = {};
  editedItem.id = item_id;
  editedItem.count = item_count;
  editedItem.tot_cost = item_tot_cost;
  for(let i = 0; i < LIST_OF_EDITED_ITEMS.length; i++){
    if(LIST_OF_EDITED_ITEMS[i].id === item_id){
      LIST_OF_EDITED_ITEMS[i].count = item_count;
      console.log('LIST_OF_EDITED_ITEMS: ',LIST_OF_EDITED_ITEMS);
      return;
    }
  }
  LIST_OF_EDITED_ITEMS.push(editedItem);
}

const updateBag = () => {
  console.log('LIST_OF_EDITED_ITEMS -> ',LIST_OF_EDITED_ITEMS);
  for(let i = 0; i < LIST_OF_EDITED_ITEMS.length; i++){
    fetch('/update-bag', {
      method:'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        item_id: LIST_OF_EDITED_ITEMS[i].id,
        item_count: LIST_OF_EDITED_ITEMS[i].count,
        item_tot_cost: LIST_OF_EDITED_ITEMS[i].tot_cost
      }),
      credentials: "same-origin"
    })
    .then(() => {
      let user_id = $('.users_persistent_id')[0].innerHTML;
      update_cart_and_count_by_id(user_id);
    })
    .catch(err => console.log(err))
  }
}
