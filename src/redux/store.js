import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const configureStore = () => {
  let middleware = applyMiddleware(thunk);
  
  if(__DEV__) {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(
    reducers,
    middleware
  );

  if (module.hot) {
      module.hot.accept('./reducers', () => {
          const nextRootReducer = require('./reducers');
          store.replaceReducer(nextRootReducer);
      });
  }

  return store;
}
