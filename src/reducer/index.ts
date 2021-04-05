import { combineReducers } from "redux";
import { dataReducer } from "./reducer";

export const rootReducer = combineReducers({
  dataReducer: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
