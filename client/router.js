import { mount } from 'react-mounter';
import Home from './components/main';
import Products from './components/products';
import Quote from './components/quote';
import Loans from './components/loans';
import Login from './components/admin/login';

const routes = {
  '/': Home,
  '/products': Products,
  '/quote': Quote,
  '/loans': Loans,
  '/secret/backend/portal': Login,
};

mount(routes[window.location.pathname]);
