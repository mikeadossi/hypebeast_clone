const filterThisItem = (element, brandName) => {
  const uiCategories = allProductSizesSingleValueArr;

  const dbCategories = allProductSizesObj;

  let filterParameter;

  if(!element.value){
    filterParameter = element.innerHTML;
    uiCategories.indexOf(filterParameter) > -1 ? filterParameter = dbCategories[filterParameter] : filterParameter = filterParameter
  } else {
    filterParameter = element.value.replace(/ /g,'');
  }

  let url = window.location.href;

  if(filterParameter === 'newest_first'){
    url = url.replace(/\/newest_first/g,"");
    url = url.replace(/\/high_to_low/g,"");
    url = url.replace(/\/low_to_high/g,"");
    document.location.href = url;
    return;
  }

  if(url.indexOf(filterParameter) > -1){
    url = url.replace('/'+filterParameter,'');
    if(!url.split('/filter')[1]){
      url = url.split('/filter')[0];
      document.location.href = url;
    }
  } else if(url.indexOf('filter') > -1){
    url += '/' + filterParameter;
  } else {
    url += '/filter/' + filterParameter;
  }

  const directions = ['high_to_low','low_to_high'];

  if(directions.indexOf(filterParameter) > -1 && url.indexOf(directions[0] > -1) || directions.indexOf(filterParameter) > -1 && url.indexOf(directions[1] > -1)){
    // remove all possible duplicates of directional params in the url
    url = url.replace(/\/newest_first/g,"");
    url = url.replace(/\/high_to_low/g,"");
    url = url.replace(/\/low_to_high/g,"");
    url += '/' + filterParameter;
  }

  fetch(url, {
    method:'GET',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    credentials: "same-origin"
  })
  .then(() => {
    document.location.href = url;
  })
  .catch(err => console.log(err));

};

const clearAllFilters = () => {
  let url = window.location.href;
  url = url.split('/filter')[0]
  document.location.href = url;
}

const updateHBXPassword = (element) => {
  let user = $('#hiddenUserInput').val();
  let form = element.parentNode;

  let currentPassword = form.childNodes[1].childNodes[1].childNodes[0].value;
  let newPassword = form.childNodes[2].childNodes[1].childNodes[0].value;
  let verifyPassword = form.childNodes[3].childNodes[1].childNodes[0].value;

  if(!currentPassword.length || !newPassword.length || !verifyPassword.length){
    $('#password_form_error_message').html('please fill all fields');
    return;
  }

  if(newPassword !== verifyPassword){
    $('#password_form_error_message').html('new passwords do not match');
    $('.profile_curr_password_input').val('');
    $('.profile_verify_password_input').val('');
    $('.profile_password_input').val('');
    return
  }

  fetch('/update-password-in-db', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      user: user
    }),
    credentials: "same-origin"
  })
  .then(() => {
    $('.profile_curr_password_input').val('');
    $('.profile_verify_password_input').val('');
    $('.profile_password_input').val('');
    alert('successful password edit.')
  })
  .catch(err => console.log(err));
}
