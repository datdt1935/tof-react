import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { rootReducer } from "../reducer";

const composeEnhancers = composeWithDevTools({});

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
