import rp from 'request-promise';
import { Meteor } from 'meteor/meteor';

const { PRODUCTS_API_TOKEN } = Meteor.settings;

export default function getEforoProducts(page) {
  const options = {
    uri: 'https://onlineposting.e-foro.com/items_api/get_items',
    qs: { status: 'IN_QUEUE', page },
    headers: {
      'User-Agent': 'allpawn-autobot-optimus-prime',
      'X-Authorization': `TOKEN ${PRODUCTS_API_TOKEN}`,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    rp(options)
      .then((results) => {
        resolve({ items: results.items, pageCount: results.page_count, page });
      }).catch(err => reject(err));
  });
}
