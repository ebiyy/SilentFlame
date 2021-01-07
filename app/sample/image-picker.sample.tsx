import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  Button,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export function PickerButton({title, onPress}) {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} />
    </View>
  );
}

export default function SampleImagePicker() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    console.log(response);
    // ex.
    // {
    //   fileName: "5C99555B-7CFC-430B-8695-AB6F5012349C.jpg"
    //   fileSize: 40821
    //   height: 133
    //   type: "image/jpg"
    //   uri: "file:///Users/homepc/Library/Developer/CoreSimulator/Devices/0B9A1B75-81BA-4C09-8E5F-E20F15253157/data/Containers/Data/Application/888A656F-6E9E-492C-B596-AE8326B97FED/tmp/5C99555B-7CFC-430B-8695-AB6F5012349C.jpg"
    //   width: 200
    // }
  }, [response]);

  return (
    <SafeAreaView>
      <ScrollView>
        <PickerButton
          title="Take image"
          onPress={() =>
            launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                setResponse(response);
              },
            )
          }
        />

        <PickerButton
          title="Select image"
          onPress={() =>
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                setResponse(response);
              },
            )
          }
        />

        <View style={styles.response}>
          <Text>Res: {JSON.stringify(response)}</Text>
        </View>

        {response && (
          <View style={styles.image}>
            <Image
              style={{width: 200, height: 200}}
              source={{uri: response.uri}}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginVertical: 24,
    marginHorizontal: 24,
  },
  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
  response: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  buttonContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
