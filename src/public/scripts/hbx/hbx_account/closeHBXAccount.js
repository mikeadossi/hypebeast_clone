/* global closeHBXAccount, $, confirm, fetch, Headers, window, document,
console */
/* exported closeHBXAccount */

const closeHBXAccount = () => {
  let password = $(".close_account_password_input").val();
  let userId = $("#hiddenUserId").html();

  if(!password){
    $("#close_account_error_message").html("please enter a password");
  }

  if(confirm("Are you sure you want to close your account?")){

    fetch("/hbx_account/close-account", {
      method:"DELETE",
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
      .catch(err => console.log(err));

  } else {
    return;
  }

};
