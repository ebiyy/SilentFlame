***REMOVED***
***REMOVED***
import Realm from 'realm';

const App = () => {
  const [realm, setRealm] = useState<Realm>();

***REMOVED***
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'***REMOVED******REMOVED***],
    ***REMOVED***).then((realm2: Realm) => {
      realm2.write(() => {
        realm2.create('Dog', {name: 'Rex'***REMOVED***
      ***REMOVED***
      setRealm(realm2);
    ***REMOVED***

    // 【終了処理】処理が終了したらデータベースを閉じる
    const cleanup = () => {
      if (realm !== undefined && !realm.isClosed) {
        realm.close();
      ***REMOVED***
    ***REMOVED***

    // return する関数が終了処理(componentWillUnmountに相当)
    return cleanup;
***REMOVED*** []);

  const info = realm
    ? 'Number of dogs in this Realm: ' + realm.objects('Dog').length
    : 'Loading...';

***REMOVED***
***REMOVED***
***REMOVED***
        <Text>{info***REMOVED***</Text>
***REMOVED***
        <Text>{realm?.path***REMOVED***</Text>
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

export default App;
