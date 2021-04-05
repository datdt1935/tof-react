import { DatatableAction, DatatableActionEnum } from "./action";
import { SingleInstanceState } from "./type";
import update from "react-addons-update";
const initialState: SingleInstanceState = {
  ui: {
    showDialogCreate: false,
  },
  allUsers: [],
};

export function dataReducer(
  state = initialState,
  action: DatatableAction
): SingleInstanceState {
  const { type, payload } = action;

  switch (type) {
    case DatatableActionEnum.SET_INIT_DATA_TIMESHEET:
      //currentUser
      // return state;
      return update(state, {});

    default:
      return state;
  }
}
