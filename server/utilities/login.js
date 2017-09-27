import { Meteor } from 'meteor/meteor';

const { ADMIN_LOGIN_UN, ADMIN_LOGIN_PW } = Meteor.settings;

export default function login(un, pw) {
  return un === ADMIN_LOGIN_UN && pw === ADMIN_LOGIN_PW;
}
