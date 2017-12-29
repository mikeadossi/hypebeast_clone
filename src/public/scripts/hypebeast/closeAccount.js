/* global $, confirm, fetch, Headers, window, document,
console */
/* exported closeAccount */

const closeAccount = () => {

  let formChildNodeLength = document.getElementById("form").childNodes.length;
  // let userId = $("#hiddenUserId").html();
  let userId = document.cookie.split("userCookie=")[1];
  console.log('document.cookie.split("userCookie=") -> ',document.cookie.split("userCookie="));
  console.log('userId --==----> ',userId);
  console.log('typeof userId --==----> ',typeof userId);

  if(confirm("Are you sure you want to close your account?")){

    let password;

    if(formChildNodeLength > 1){
      password = $(".profile_close_account_input").val();

      if(!password){
        $("#close_account_error_message").html("please enter a password");
        return;
      }
    } else {
      password = null;
    }

    fetch("/account/close-account", {
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
        console.log('back in fetch api!');
        let url = window.location.href.split("/account/")[0];
        let localStorage = window.localStorage;
        localStorage.clear();
        document.location.href = url + "/logout";
      })
      .catch(err => console.log(err));

  }

  return;

};
