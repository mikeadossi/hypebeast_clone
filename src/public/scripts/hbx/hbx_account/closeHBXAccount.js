/* global $, confirm, fetch, Headers, window, document,
console */
/* exported closeHBXAccount */

const closeHBXAccount = () => {

  let formChildNodeLength = document.getElementById("form").childNodes.length;
  let userId = document.cookie.split("userCookie=")[1];

  if(confirm("Are you sure you want to close your account?")){

    let password;

    if(formChildNodeLength > 1){
      password = $(".close_account_password_input").val();

      if(!password){
        $("#close_account_error_message").html("please enter a password");
        return;
      }
    } else {
      password = null;
    }

    fetch("/hbx_account/close-account", {
      method:"POST",
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        user_id: userId,
        user_password: password
      }),
      mode: "cors",
      credentials: "same-origin",
      cache: "default"
    })
      .then( () => {
        let url = window.location.href.split("/hbx_account/")[0];
        let localStorage = window.localStorage;
        localStorage.clear();
        document.location.href = url + "/hbx_logout";
      })
      .catch(err => console.log('err --> ',err));

  }

  return;

};
