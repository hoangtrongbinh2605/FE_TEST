import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import User from './component/User';
import Login from './component/Login';
import Register from './component/Register';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/user' component={User} />
          <Route path='/register' component={Register} />
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
