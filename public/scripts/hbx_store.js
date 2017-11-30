const filterThisItem = (element, brandName) => {
  let value;

  const uiCategories = [
    'S',
    'M',
    'L',
    'XL',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '28',
    '30',
    '32',
    '34',
    '36'
  ];

  const dbCategories = {
    'S': 'small_count',
    'M': 'medium_count',
    'L': 'large_count',
    'XL': 'xlarge_count',
    '8': 'us_8_count',
    '8.5': 'us_8_5_count',
    '9': 'us_9_count',
    '9.5': 'us_9_5_count',
    '10': 'us_10_count',
    '10.5': 'us_10_5_count',
    '11': 'us_11_count',
    '11.5': 'us_11_5_count',
    '12': 'us_12_count',
    '28': 'pants_28_count',
    '30': 'pants_30_count',
    '32': 'pants_32_count',
    '34': 'pants_34_count',
    '36': 'pants_36_count',
  };


  if(!element.value){
    value = element.innerHTML;
    uiCategories.indexOf(value) > -1 ? value = dbCategories[value] : value = value
  } else {
    value = element.value;
  }

  let url = window.location.href + '/filter/' + value;

  fetch(url, {
    method:'GET',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    credentials: "same-origin"
  })
  .then(() => {
    console.log('worked');
  })
  .catch(err => console.log(err))
}
