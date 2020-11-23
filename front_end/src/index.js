import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import PostListing from './pages/PostListing';
import Profile from './pages/Profile';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import MessageCenter from './components/ChatBox/ChatBox';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/Profile" component={Profile}></Route>
        <Route path="/PostListing" component={PostListing}></Route>
        <Route path="/messages" component={MessageCenter}></Route>
      </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
