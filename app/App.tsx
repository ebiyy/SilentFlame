import React, {Suspense} from 'react';
import {RecoilRoot} from 'recoil';
import Spinner from './components/activity-indicator';
import InitApp from './init-app';
import {AsyncStorageDebug} from '../utility/AsyncStorageDebug';
if (__DEV__) AsyncStorageDebug();

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RecoilRoot>
        <InitApp />
      </RecoilRoot>
    </Suspense>
  );
};

export default App;
