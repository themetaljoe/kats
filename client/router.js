import { mount } from 'react-mounter';
import Home from './components/main';

const routes = {
  '/': Home,
};

mount(routes[window.location.pathname]);
