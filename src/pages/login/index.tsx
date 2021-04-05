import * as React from "react";
import { RootState } from "../../redux";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

type Props = {
  todos: any[]; // What ever the type of state.todos is
  actions: {
    addTodo: Dispatch<any>;
  };
};

class Login extends React.Component<Props> {
  public componentDidMount() {
    console.log("Run didmount dialog Create");
  }

  render() {
    return <h1>akjhasfkj</h1>;
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
      //   getAllUserForPickupAction: getAllUserForPickup,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
