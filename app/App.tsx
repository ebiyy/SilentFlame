import React, {Suspense} from 'react';
import {RecoilRoot} from 'recoil';
import Spinner from './components/activity-indicator';
import FirebaseSetting from './firebase/firebase';

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RecoilRoot>
        <FirebaseSetting />
      </RecoilRoot>
    </Suspense>
  );
};

export default App;
