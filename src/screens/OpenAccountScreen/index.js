import React from "react";
import AppJson from '../../../app.json';

import CIS01 from "./CIS01.js";
import CIS02 from "./CIS02.js";
import CIS03 from "./CIS03.js";
import CIS04 from "./CIS04.js";
import CIS05 from "./CIS05.js";
import CIS06 from "./CIS06.js";
import CIS07 from "./CIS07.js";
import CIS08 from "./CIS08.js";
import CIS09 from "./CIS09.js";
import CIS10 from "./CIS10.js";
import CIS11 from "./CIS11.js";
import CIS12 from "./CIS12.js";
import CIS13 from "./CIS13.js";
import CIS14 from "./CIS14.js";
import OTPOpenAccountScreen from "./OTPOpenAccountScreen"
import OTPScreen from "../OTPScreen/OTPScreen";
import ConnectCreateAccountScreen from "./ConnectCreateAccountScreen.js";
import LinkAccount from "./LinkAccount.js";

import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator({
  CIS01: { screen: CIS01 },
  CIS02: { screen: CIS02 },
  CIS03: { screen: CIS03 },
  CIS04: { screen: CIS04 },
  CIS05: { screen: CIS05 },
  CIS06: { screen: CIS06 },
  CIS07: { screen: CIS07 },
  CIS08: { screen: CIS08 },
  CIS09: { screen: CIS09 },
  CIS10: { screen: CIS10 },
  CIS11: { screen: CIS11 },
  CIS12: { screen: CIS12 },
  CIS13: { screen: CIS13 },
  CIS14: { screen: CIS14 },
  OTPOpenAccount: {screen: OTPOpenAccountScreen},
  OTPScreen: { screen: OTPScreen },
  ConnectCreateAccountScreen: { screen: ConnectCreateAccountScreen },
  LinkAccount: { screen: LinkAccount }
}, {
  initialRouteName: 'ConnectCreateAccountScreen'
}));
