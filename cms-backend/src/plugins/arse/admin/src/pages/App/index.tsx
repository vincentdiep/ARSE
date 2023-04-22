/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import Floorplan from '../Floorplan';

const App: React.VoidFunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={Floorplan} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
