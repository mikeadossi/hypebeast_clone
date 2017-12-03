const filterThisItem = (element, brandName) => {
  let value;

  const uiCategories = allProductSizesSingleValueArr;

  const dbCategories = allProductSizesObj;


  if(!element.value){
    value = element.innerHTML;
    uiCategories.indexOf(value) > -1 ? value = dbCategories[value] : value = value
  } else {
    value = element.value;
  }

  let url = window.location.href;

  if(url.indexOf(value) > -1){
    url = url.replace('/'+value,'');
    if(!url.split('/filter')[1]){
      url = url.split('/filter')[0];
      document.location.href = url;
    }
  } else if(url.indexOf('filter') > -1){
    url += '/' + value
  } else {
    url += '/filter/' + value;
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
