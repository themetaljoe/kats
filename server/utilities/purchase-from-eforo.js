import { Meteor } from 'meteor/meteor';
import rp from 'request-promise';

const { PRODUCTS_API_TOKEN } = Meteor.settings;

export default function markEforoProdctAsSold(product, buyer) {
  const { external_id } = product;
  const sold_price = product.value;
  const payment_type = 'CREDIT';
  const quantity = 1;
  console.log(product, buyer);
  const options = {
    uri: 'https://onlineposting.e-foro.com/items_api/create_item_sale',
    body: {
      external_id,
      sold_price,
      payment_type,
      quantity,
      buyer,
    },
    headers: {
      'User-Agent': 'allpawn-autobot-optimus-prime',
      'X-Authorization': `TOKEN ${PRODUCTS_API_TOKEN}`,
    },
    json: true,
  };

  console.log(options.body);
  return new Promise((resolve, reject) => {
    rp(options)
      .then((results) => {
        resolve(results);
      }).catch(err => reject(err));
  });
}
