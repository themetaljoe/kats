import { Meteor } from 'meteor/meteor';
import rp from 'request-promise';
/* probably should be deleted, but if it becomes needed to auto upload images to
 * the eforo system I figured I'd keep this code around */
export default function uploadImageToEforo(external_id, photo_url) {
  const options = {
    uri: 'https://onlineposting.e-foro.com/items_api/add_photo',
    body: {
      external_id,
      photo_url,
    },
    headers: {
      'User-Agent': 'allpawn-autobot-optimus-prime',
      'X-Authorization': `TOKEN ${Meteor.settings.PRODUCTS_API_TOKEN}`,
    },
    json: true,
  };

  return rp(options).then(res => Promise.resolve(res)).catch(err => console.log('error posting image once again', err));
}
