import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

// pages
import StartPage from "./views/StartPage";
import RegisterPage from "./views/RegisterPage";
import BookPitch from "./views/BookPitch";
import SignInPage from "./views/SignInPage";
import Dashboard from "./views/Dash/Dashboard.jsx";

import store from "./store";
import AuthenticationRoute from "./views/AuthenticationRoute.js";
// import LoginPage from "./views/LoginPage";
import { loadUser } from "./actions/auth";
import { get_bookings, get_stats } from "./actions/bookings";
import { get_properties } from "./actions/propertyActions";
var hist = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    store.dispatch(get_bookings());
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(loadUser());
      store.dispatch(get_stats());
      store.dispatch(get_properties());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={hist}>
          <Fragment>
            <Routes>
              <Route exact path="/login" element={<SignInPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/book_pitch" element={<BookPitch />} />
              <Route
                exact
                path="/dashboard"
                element={<AuthenticationRoute component={Dashboard} />}
              />
              <Route exact path="/" element={<StartPage />} />
            </Routes>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
