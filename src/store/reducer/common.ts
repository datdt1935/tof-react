import { cloneDeep } from 'lodash';
import update from 'react-addons-update';
import { TOFCommonAction, TOFCommonActionEnum } from 'store/action/action';
import { TOFState } from 'store/type/common';
const initialState: TOFState = {
  ui: {
    showDialogCreate: false,
  },
  comboBoxOption: {},
};

export function dataReducer(
  state = cloneDeep(initialState),
  action: TOFCommonAction
): TOFState {
  const { type, payload } = action;
  switch (type) {
    case TOFCommonActionEnum.SET_COMBO_BOX_OPTION:
      return update(state, {
        comboBoxOption: { $merge: payload },
      });
    default:
      return state;
  }
}
