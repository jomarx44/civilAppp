import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const configureStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (module.hot) {
      module.hot.accept('./reducers', () => {
          const nextRootReducer = require('./reducers');
          store.replaceReducer(nextRootReducer);
      });
  }

  return store;
}
