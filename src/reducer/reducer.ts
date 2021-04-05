import { DatatableAction, DatatableActionEnum } from './action';
import { SingleInstanceState } from './type';
import update from 'react-addons-update';
const initialState: SingleInstanceState = {
  ui: {
    showDialogCreate: false,
  },
  allUsers: [],
  title: 'Dat duong',
  isLogin: false,
};

export function dataReducer(
  state = initialState,
  action: DatatableAction
): SingleInstanceState {
  const { type, payload } = action;

  console.log('DATA PAYLOAD  Call ', payload);
  switch (type) {
    case DatatableActionEnum.SET_INIT_DATA_TIMESHEET:
      //currentUser
      // return state;
      return update(state, {});

    case DatatableActionEnum.SET_TITLE_NAME:
      return update(state, {
        title: { $set: payload },
      });

    case DatatableActionEnum.SET_LOGIN_USER:
      return update(state, {
        isLogin: { $set: payload },
      });
    default:
      return state;
  }
}
