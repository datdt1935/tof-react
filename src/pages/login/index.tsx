import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { setLogin } from '../../reducer/action';
// import { networkService } from '../../api';

import styles from './login.module.scss';
import WEB_ROUTES from 'constants/web-router';
import { Link } from 'react-router-dom';
import { RootState } from 'store/reducer';

// import { ipcRenderer } from 'electron';
// const { requireTaskPool } = window.require('electron-remote');

class Login extends React.Component<any> {
  public componentDidMount() {
    console.log('Run didmount dialog Create');
    this.getallDesign();
  }

  getallDesign = async () => {
    // const test = await networkService.networkControllerGetAll();
    // console.log(response);
    // window.ipcRenderer.send('notify', 'message');
  };

  onResetMDNS = async function () {
    const ipcRenderer = (window as any).electron.ipcRenderer;
    ipcRenderer.invoke('resetMDNS', null).then((result: Array<any>) => {
      console.log('data', result);
    });
  };

  onMdnsFetch = async function () {
    const ipcRenderer = (window as any).electron.ipcRenderer;
    ipcRenderer.invoke('mdnsFetch', null).then((result: any) => {
      console.log('data', result);
    });
  };

  onMdnsStart = async function () {
    const ipcRenderer = (window as any).electron.ipcRenderer;
    ipcRenderer.invoke('startMDNS', null).then((result: any) => {
      console.log('data', result);
    });
  };
  onMdnsStop = async function () {
    const ipcRenderer = (window as any).electron.ipcRenderer;
    ipcRenderer.invoke('stopMDNS', null).then((result: any) => {
      console.log('data', result);
    });
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

        <button
          onClick={() => {
            this.onResetMDNS();
          }}
        >
          Reset
        </button>

        <button
          onClick={() => {
            this.onMdnsFetch();
          }}
        >
          Fetch Dât
        </button>

        <button
          onClick={() => {
            this.onMdnsStop();
          }}
        >
          onMdnsStop
        </button>

        <button
          onClick={() => {
            this.onMdnsStart();
          }}
        >
          onMdnsStart
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
  const { ui } = state.dataReducer;

  const { showDialogCreate } = ui;

  return {
    ...ownProps,
    isShow: showDialogCreate,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      //   setDialogDisplayAction: setDialogDisplay,
      //   setLoginAction: setLogin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
