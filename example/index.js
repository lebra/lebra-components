import react from 'react';
import reactDOM, { render } from 'react-dom';
import MainPage from './containers/main/index';

import './index.less';

let root = document.getElementById('app');

render(<MainPage />, root);
