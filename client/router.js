import { mount } from 'react-mounter';
import Home from './components/main';
import Products from './components/products';

const routes = {
  '/': Home,
  '/products': Products,
};

mount(routes[window.location.pathname]);
