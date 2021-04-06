import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLogin } from 'reducer/action';
import { RootState } from 'reducer';

import styles from './dashboard.module.scss';
import WEB_ROUTES from 'config/web-router';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component<any> {
  public componentDidMount() {
    console.log('Run didmount dialog Create');
  }

  render() {
    console.log(this.props);
    return (
      <>
        <h1>Page Dashboard</h1>
        <Link to="/sample">Sample</Link>

        <div className={styles.container}>
          <button
            className={styles.button}
            onClick={() => {
              localStorage.setItem('isLogin', 'false');

              setTimeout(() => {
                this.props.history.push(WEB_ROUTES.LOGIN_PAGE.path);
              }, 100);
            }}
          >
            Logout
          </button>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
