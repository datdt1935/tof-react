import * as React from 'react';
import { RootState } from '../../../reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLogin, setTitleLogin } from '../../../reducer/action';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'constants/route.constant';

import styles from './dashboard.module.scss';

type Props = {
  todos: any[]; // What ever the type of state.todos is
  actions: {
    addTodo: Dispatch<any>;
  };
};

class Dashboard extends React.Component<any> {
  public componentDidMount() {
    console.log('Run didmount dialog Create');
  }

  render() {
    console.log(this.props);
    return (
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            localStorage.setItem('isLogin', 'false');

            setTimeout(() => {
              this.props.history.push(PUBLIC_ROUTES.Login);
            }, 100);
          }}
        >
          Logout
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
