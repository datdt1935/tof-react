import * as React from 'react';
import { RootState } from '../../reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLogin } from '../../reducer/action';
import { networkService } from '../../api';

import styles from './login.module.scss';
import WEB_ROUTES from 'config/web-router';
import { Link } from 'react-router-dom';

// import { ipcRenderer } from 'electron';
// const { requireTaskPool } = window.require('electron-remote');

class Login extends React.Component<any> {
  public componentDidMount() {
    console.log('Run didmount dialog Create');
    this.getallDesign();
  }

  getallDesign = async () => {
    const test = await networkService.networkControllerGetAll();
    // console.log(response);
    // window.ipcRenderer.send('notify', 'message');
  };

  render() {
    console.log('PROPS LOGIN PAGE ', this.props);
    return (
      <div className={styles.container}>
        <button
          onClick={() => {
            // var ipcRenderer = require('electron').ipcRenderer;
            // ipcRenderer.send('DAT', 'TITTLE');
            const ipcRenderer = (window as any).electron.ipcRenderer;
            ipcRenderer
              .invoke('scanLocalIP', null)
              .then((result: Array<any>) => {
                alert(`We got ${result.length} ips`);
                console.log('data', result);
              });
          }}
        >
          Click ipcRenderer
        </button>

        <Link to="/">Home</Link>
        <button
          className={styles.button}
          onClick={() => {
            localStorage.setItem('isLogin', 'true');

            setTimeout(() => {
              this.props.history.push(WEB_ROUTES.DASHBOARD.path);
            }, 100);
          }}
        >
          Login
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state: RootState, ownProps: any) => {
  const { ui, title } = state.dataReducer;

  const { showDialogCreate } = ui;

  return {
    ...ownProps,
    isShow: showDialogCreate,
    ten: title,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      //   setDialogDisplayAction: setDialogDisplay,
      setLoginAction: setLogin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
