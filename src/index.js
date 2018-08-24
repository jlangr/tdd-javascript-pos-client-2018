import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
// import { render } from 'react-dom';

// see root id in public/index.html
// render(<App />, document.getElementById('root'));

const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>);

ReactDOM.render(Root(), document.getElementById('root'));