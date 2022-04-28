import { combineReducers } from 'redux';
import { dataReducer } from './common';
import notifications from './notification.reducer';

export const rootReducer = combineReducers({
  dataReducer: dataReducer,
  notifications,
});

export type RootState = ReturnType<typeof rootReducer>;
