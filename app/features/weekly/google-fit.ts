import GoogleFit, {Scopes} from 'react-native-google-fit';

export const getGoogleFitData = () => {
  GoogleFit.checkIsAuthorized().then(() => {
    console.log('GoogleFit.isAuthorized', GoogleFit.isAuthorized); // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
  });
};
