import { Meteor } from 'meteor/meteor';
import authCreditCard from './utilities/auth-credit-card';
import getEforoProducts from './utilities/eforo';
import login from './utilities/login';
import saveTransform from './collections/transforms/save';
import getTransforms from './collections/transforms/get';

Meteor.methods({
  authCreditCard,
  getEforoProducts,
  login,
  saveTransform,
  getTransforms,
});
