import React, {Suspense} from 'react';
import {RecoilRoot} from 'recoil';
import Spinner from './components/activity-indicator';
import InitApp from './init-app';

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
