import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { rootReducer } from "../redux";

const composeEnhancers = composeWithDevTools({});

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);