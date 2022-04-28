export enum TOFCommonActionEnum {
  SET_COMBO_BOX_OPTION = 'SET_COMBO_BOX_OPTION',
}

export const setComboBoxOptions = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: TOFCommonActionEnum.SET_COMBO_BOX_OPTION,
    payload,
  });
};

export interface DataObject<T> {
  data: T;
}

export type ActionPayload = {
  [TOFCommonActionEnum.SET_COMBO_BOX_OPTION]: DataObject<any>;
};
export type TOFCommonAction = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
