import produce from 'immer';

export const ENQUEUE_SNACKBAR = '[COMMON] ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = '[COMMON] CLOSE_SNACKBAR';

const initialState: any[] = [];

interface IENQUEUE_SNACKBAR {
  type: typeof ENQUEUE_SNACKBAR;
  notifications: any[];
}

interface ICLOSE_SNACKBAR {
  type: typeof CLOSE_SNACKBAR;
  key: string;
}

type Actions = IENQUEUE_SNACKBAR | ICLOSE_SNACKBAR;

const reducer = produce((draft, action: Actions) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return [...draft, ...action.notifications];
    case CLOSE_SNACKBAR:
      return draft.filter(
        (notification: any) => notification.key !== action.key
      );
  }
}, initialState);

export { initialState, reducer as default };
