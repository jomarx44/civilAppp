import { connect } from 'react-redux'
import Screen from "./FingerprintScreen"

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export const FingerprintScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);

export default FingerprintScreen;