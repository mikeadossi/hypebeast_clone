/* global $, fetch, Headers, console, setTimeout */
/* exported updateHBXPassword */

const updateHBXPassword = () => {
  let user = $(".hiddenUserInput").val();
  let currentPassword = $(".profile_curr_password_input").val();
  let newPassword = $(".profile_password_input").val();
  let verifyPassword = $(".profile_verify_password_input").val();

  if(!currentPassword.length || !newPassword.length || !verifyPassword.length){
    $(".password_form_error_message").html("please fill all fields");
    return;
  }

  if(newPassword !== verifyPassword){
    $(".password_form_error_message").html("New passwords do not match");
    $(".profile_curr_password_input").val("");
    $(".profile_verify_password_input").val("");
    $(".profile_password_input").val("");
    setTimeout(() => {
      $(".password_form_error_message").fadeOut( "slow" );
    }, 5000);
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
    .then(msg => msg.json())
    .then((msg) => {
      $(".profile_curr_password_input").val("");
      $(".profile_verify_password_input").val("");
      $(".profile_password_input").val("");
      $(".password_form_success_message").html("");
      $(".password_form_error_message").html("");
      if(msg === "Successful password edit!"){
        $(".password_form_success_message").html("");
        $(".password_form_success_message").html(msg);
        setTimeout(() => {
          $(".password_form_success_message").fadeOut( "slow" );
        }, 3000);
      } else {
        $(".password_form_error_message").html("");
        $(".password_form_error_message").html(msg);
        setTimeout(() => {
          $(".password_form_error_message").fadeOut( "slow" );
        }, 5000);
      }
    })
    .catch(err => console.log(err));
};
