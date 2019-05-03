import React from 'react';
import ReactDOM from 'react-dom';
import  { BrowserRouter as Router, withRouter} from 'react-router-dom'
import './component-assets/Index.scss'
import './component-assets/BoardPage.scss'

import Main from './components/App'
const App = withRouter(Main)
// import * as serviceWorker from './serviceWorker'
  ;


ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.getElementById('root'));
// serviceWorker.unregister();
