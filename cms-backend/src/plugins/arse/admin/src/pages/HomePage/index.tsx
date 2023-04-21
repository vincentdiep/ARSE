/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState, useRef} from 'react';
import pluginId from '../../pluginId';
import { ThemeProvider, lightTheme } from '@strapi/design-system';

function App({ children }) {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default App;
