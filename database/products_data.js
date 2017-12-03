const allProductSizesArr = [
  'small_count',
  'medium_count',
  'large_count',
  'xlarge_count',
  'us_8_count',
  'us_8_5_count',
  'us_9_count',
  'us_9_5_count',
  'us_10_count',
  'us_10_5_count',
  'us_11_count',
  'us_11_5_count',
  'us_12_count',
  'pants_28_count',
  'pants_30_count',
  'pants_32_count',
  'pants_34_count',
  'pants_36_count'
];

const allProductSizesSingleValueArr = [
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
  '12.5',
  '28',
  '30',
  '32',
  '34',
  '36'
];

const allProductSizesString = `
  small_count,
  medium_count,
  large_count,
  xlarge_count,
  us_8_count,
  us_8_5_count,
  us_9_count,
  us_9_5_count,
  us_10_count,
  us_10_5_count,
  us_11_count,
  us_11_5_count,
  us_12_count,
  pants_28_count,
  pants_30_count,
  pants_32_count,
  pants_34_count,
  pants_36_count
`;

const allProductSizesObj = {
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
  '36': 'pants_36_count'
};

const allProductClothingCategoriesArr = [
  'accessories',
  'caps',
  'hats',
  'jackets',
  'jackets',
  'shorts',
  'boots',
  'sneakers',
  'ss t-shirts',
  't-shirts',
  'pants',
  'hoodies',
  'sweatshirts',
  'jeans',
  'toys',
  'homeware',
  'sandals',
  'underwear'
];

const allProductColorsArr = [
  'beige',
  'black',
  'blue',
  'green',
  'grey',
  'red',
  'white',
  'purple',
  'brown'
];

const allBrandNamesObj = {
  '11-by-boris-bidjan-saberi': '11 by Boris Bidjan Saberi',
  'tres-bien': 'Tres Bien',
  'adidas-originals': 'Adidas Originals',
  'denim-by-vanquish-fragment': 'Denim by Vanquish & Fragment',
  'mastermind-world': 'Mastermind World',
  'undercover': 'Undercover'
};

module.exports = {
  allProductSizesArr,
  allProductSizesString,
  allProductSizesObj,
  allProductClothingCategoriesArr,
  allProductColorsArr,
  allProductSizesSingleValueArr,
  allBrandNamesObj
}
