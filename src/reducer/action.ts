export enum DatatableActionEnum {
  SET_INIT_DATA_TIMESHEET = 'datatable/SET_INIT_DATA_TIMESHEET',
  GET_CURRENT_USER = 'GET_CURRENT_USER',
  SET_DISPLAY_DIALOG_CREATE = 'SET_DISPLAY_DIALOG_CREATE',
  SET_TITLE_NAME = 'SET_TITLE_NAME',
  SET_LOGIN_USER = 'SET_LOGIN_USER',
}

export const getCurrentUser = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: DatatableActionEnum.GET_CURRENT_USER,
    payload,
  });
};
export const setDialogDisplay = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: DatatableActionEnum.SET_DISPLAY_DIALOG_CREATE,
    payload,
  });
};

export const setTitleLogin = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: DatatableActionEnum.SET_TITLE_NAME,
    payload,
  });
};

export const setLogin = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: DatatableActionEnum.SET_LOGIN_USER,
    payload,
  });
};

export interface DataObject<T> {
  data: T;
}

export type DatatablePayload = {
  [DatatableActionEnum.SET_DISPLAY_DIALOG_CREATE]: DataObject<any>;
  [DatatableActionEnum.GET_CURRENT_USER]: DataObject<any>;
  [DatatableActionEnum.SET_INIT_DATA_TIMESHEET]: DataObject<any>;
  [DatatableActionEnum.SET_TITLE_NAME]: DataObject<any>;
  [DatatableActionEnum.SET_LOGIN_USER]: DataObject<any>;
};
export type DatatableAction = ActionMap<DatatablePayload>[keyof ActionMap<DatatablePayload>];

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
