import * as React from 'react';
import { RootState } from '../../reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLogin } from '../../reducer/action';
import { apiService } from '../../api';

import styles from './login.module.scss';
import WEB_ROUTES from 'config/web-router';

class Login extends React.Component<any> {
  public componentDidMount() {
    console.log('Run didmount dialog Create');
    this.getallDesign();
  }

  getallDesign = async () => {
    // const response = await apiService.apiDesignsGet();
    // console.log(response);
  };

  render() {
    console.log('PROPS LOGIN PAGE ', this.props);
    return (
      <div className={styles.container}>
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
