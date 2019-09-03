/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { registerRootComponent } from 'expo';
import App from './App';


const Main = () => {
  return (
    <App />
  )
}

registerRootComponent(Main);
