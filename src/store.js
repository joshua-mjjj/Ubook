import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

// Customize the Redux Dev Tools functionality for production build
  const composeEnhancers = composeWithDevTools({
    features: {
      pause: true, 
      lock: true, 
      persist: true, 
      export: true, 
      import: 'custom', 
      jump: true, 
      skip: true,
      reorder: true, 
      dispatch: false, // disable dispatching custom actions or action creators in prod
      test: true, 
    },
  });

const middleware = [thunk];

const middlewares =
    process.env.NODE_ENV === 'production'
      ? composeEnhancers(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));

const enhancers = compose(middlewares);

const store = createStore(
  rootReducer,
  initialState,
  enhancers
  // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;