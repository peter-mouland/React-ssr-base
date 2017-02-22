import debug from 'debug';

const log = debug('base:fetch-products');

const products = [{
  OrderDate: '01/01/2016',
  DeliveryCountry: 'Germany',
  Manufacturer: 'The Hipster Jeans Company',
  Gender: 'F',
  Size: '16',
  Colour: 'Dark Blue',
  Style: 'Relaxed',
  Count: 3
},
{
  OrderDate: '01/01/2016',
  DeliveryCountry: 'United Kingdom',
  Manufacturer: 'Denzil Jeans',
  Gender: 'M',
  Size: '32/32',
  Colour: 'Light Blue',
  Style: 'Skinny',
  Count: 7
},
{
  OrderDate: '02/01/2016',
  DeliveryCountry: 'France',
  Manufacturer: 'The Hipster Jeans',
  Gender: 'M',
  Size: '28/30',
  Colour: 'Red',
  Style: 'Skinny',
  Count: 6
},
{
  OrderDate: '02/01/2016',
  DeliveryCountry: 'Austria',
  Manufacturer: 'Wrangled Jeans',
  Gender: 'F',
  Size: '12',
  Colour: 'Yellow',
  Style: 'Boot Cut',
  Count: 1
}
];

export default () => Promise.resolve(products);
