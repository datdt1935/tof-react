import ReactDOM from 'react-dom';
import './index.scss';
// import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Root from './routes/index.route';

import config from './store';
import { HashRouter } from 'react-router-dom';

import { initFabricPrototype } from 'pages/sensor-configuration/canvas/canvas-special.util';

ReactDOM.render(
  <Provider store={config.configureStore}>
    <HashRouter>
      <Root />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

initFabricPrototype();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
