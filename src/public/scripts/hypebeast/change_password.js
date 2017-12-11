/* global $, console, alert, Headers, fetch */
/* exported updatePassword */
const updatePassword = (element) => {
  let user = $(".hiddenUserInput").val();
  let form = element.parentNode;

  let currentPassword = form.childNodes[1].childNodes[1].childNodes[0].value;
  let newPassword = form.childNodes[2].childNodes[1].childNodes[0].value;
  let verifyPassword = form.childNodes[3].childNodes[1].childNodes[0].value;

  if(!currentPassword.length || !newPassword.length || !verifyPassword.length){
    $(".password_form_error_message").html("please fill all fields");
    return;
  }

  if(newPassword !== verifyPassword){
    $(".password_form_error_message").html("new passwords do not match");
    $(".profile_curr_password_input").val("");
    $(".profile_verify_password_input").val("");
    $(".profile_password_input").val("");
    return;
  }

  fetch("/update-password-in-db", {
    method: "POST",
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      user: user
    }),
    credentials: "same-origin"
  })
    .then(() => {
      $(".profile_curr_password_input").val("");
      $(".profile_verify_password_input").val("");
      $(".profile_password_input").val("");
      alert("successful password edit.");
    })
    .catch(err => console.log(err));
};
