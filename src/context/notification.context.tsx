import React, { useRef, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { SnackbarProvider } from 'notistack';
import { IconButton } from 'components/material-ui';

import { removeMessage } from 'store/action/notification.action';

const NotificationProvider = (props: any) => {
  const notifications = useSelector((state: any) => state.notifications);
  const dispatch = useDispatch();
  const snackbarRef: any = useRef();
  let displayed: any = [];

  function storeDisplayed(id: string) {
    displayed = [...displayed, id];
  }

  function removeDisplayed(id: string) {
    displayed = displayed.filter((key: string) => id !== key);
  }

  useEffect(() => {
    notifications.forEach((notification: any) => {
      // Do nothing if snackbar is already displayed
      if (displayed.includes(notification.key)) return;

      snackbarRef.current.enqueueSnackbar(notification.message, {
        key: notification.key,
        preventDuplicate: true,
        variant: notification.variant,
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        onExited: (event: any, key: string) => {
          dispatch(removeMessage(key));
          removeDisplayed(key);
        },
      });

      // Keep track of snackbars that we've displayed
      storeDisplayed(notification.key);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  function onClickDismiss(key: any) {
    snackbarRef.current.closeSnackbar(key);
    removeDisplayed(key);
    dispatch(removeMessage(key));
  }

  return (
    <SnackbarProvider
      ref={snackbarRef}
      action={(key: any) => (
        <IconButton
          onClick={() => {
            onClickDismiss(key);
          }}
        >
          <i className="fal fa-close"></i>
        </IconButton>
      )}
      {...props}
    />
  );
};

export default NotificationProvider;
