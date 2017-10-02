import { Meteor } from 'meteor/meteor';
import authCreditCard from './utilities/auth-credit-card';
import getEforoProducts from './utilities/eforo';
import login from './utilities/login';
import saveTransform from './collections/transforms/save';
import getTransforms from './collections/transforms/get';
import uploadImageToEforo from './utilities/upload-image-to-eforo';
import markEforoProductAsSold from './utilities/purchase-from-eforo';

Meteor.methods({
  authCreditCard,
  getEforoProducts,
  login,
  saveTransform,
  getTransforms,
  uploadImageToEforo,
  markEforoProductAsSold,
});
