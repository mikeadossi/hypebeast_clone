/* global fetch, Headers, console */
/* exported fetchUpdateBag */

const fetchUpdateBag = (obj) => {

  return fetch("/update-bag", {
    method:"POST",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      id: obj.id,
      item_count: obj.count,
      item_tot_cost: obj.tot_cost
    }),
    credentials: "same-origin"
  })
    .then((response) => {
      console.log(response)
    })
    .catch(err => console.log(err));

};
