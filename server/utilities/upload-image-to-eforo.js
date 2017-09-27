import { Meteor } from 'meteor/meteor';
import rp from 'request-promise';
/* probably should be deleted, but if it becomes needed to auto upload images to
 * the eforo system I figured I'd keep this code around */
export default function uploadImageTest() {
  const options = {
    uri: 'https://onlineposting.e-foro.com/items_api/add_photo',
    body: {
      external_id: '689D1B89-4073-4B06-A6B4-BFC4AFE47D4A',
      photo_url: 'https://www.smarthomedb.com/files/product/watermark/amazon-echo_10.jpg',
    },
    qs: {
      external_id: '689D1B89-4073-4B06-A6B4-BFC4AFE47D4A',
      photo_url: 'https://www.smarthomedb.com/files/product/watermark/amazon-echo_10.jpg',
    },
    headers: {
      'User-Agent': 'allpawn-autobot-optimus-prime',
      'X-Authorization': `TOKEN ${Meteor.settings.PRODUCTS_API_TOKEN}`,
    },
    json: true,
  };

  return rp(options).then(res => Promise.resolve(res)).catch(err => console.log('fuckery once again', err));
}
