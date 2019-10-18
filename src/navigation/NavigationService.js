import { NavigationActions, StackActions } from 'react-navigation';
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

function navigateReset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        })
      ]
    })
  );
}

function updateMenu( loggedState ) {
  _navigator.dispatch({ loggedState : loggedState});
}

export default {
  navigate,
  navigateReset,
  updateMenu,
  setTopLevelNavigator,
  getTopLevelNavigator,
};
