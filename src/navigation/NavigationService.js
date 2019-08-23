import { NavigationActions } from 'react-navigation';
let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getTopLevelNavigator(navigatorRef) {
  return _navigator;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function updateMenu( loggedState ) {
  _navigator.dispatch({ loggedState : loggedState});
}

export default {
  navigate,
  updateMenu,
  setTopLevelNavigator,
  getTopLevelNavigator,
};
