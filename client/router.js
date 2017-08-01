import { mount } from 'react-mounter';
import Home from './components/main';
import Products from './components/products';
import Quote from './components/quote';

const routes = {
  '/': Home,
  '/products': Products,
  '/quote': Quote,
};

mount(routes[window.location.pathname]);
