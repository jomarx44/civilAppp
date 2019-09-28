import React from "react";
import AppJson from '../../../app.json';

import CIS01 from "./CIS01.js";
import CIS02 from "./CIS02.js";
import CIS03 from "./CIS03.js";
import CIS04 from "./CIS04.js";
import CIS05 from "./CIS05.js";
import CIS06 from "./CIS06.js";
import CIS07 from "./CIS07.js";


import { createStackNavigator } from "react-navigation";
export default (DrawNav = createStackNavigator({
  CIS01: { screen: CIS01 },
  CIS02: { screen: CIS02 },
  CIS03: { screen: CIS03 },
  CIS04: { screen: CIS04 },
  CIS05: { screen: CIS05 },
  CIS06: { screen: CIS06 },
  CIS07: { screen: CIS07 },
}));
