import React, {useState} from 'react';
import {Controller, Control, DeepMap, FieldError} from 'react-hook-form';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {ImagePickerResponse, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useRecoilState} from 'recoil';
import {imageResState} from '../features/suppli/suppli.hook';

type Props = {
  control: Control<Record<string, any>>;
  errors: DeepMap<Record<string, any>, FieldError>;
  editable: boolean;
  defaultValue: ImagePickerResponse | undefined;
};

export const CameraFormController = (props: Props) => {
  const {control, errors, editable, defaultValue} = props;
  const [imageData, setImageData] = useState<ImagePickerResponse | undefined>(
    defaultValue,
  );
  const [imageRes, setImageRes] = useRecoilState(imageResState);

  return (
    <>
      <View style={{display: 'none'}}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => {
            if (imageData && imageData.uri && imageData.uri !== value) {
              onChange(imageData.uri);
            }
            return (
              <TextInput
                style={[
                  styles.input,
                  errors['image'] ? styles.invalid : styles.valid,
                ]}
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
                placeholder=""
                placeholderTextColor="lightgray"
              />
            );
          }}
          name="imageRes"
          rules={{required: false}}
          defaultValue=""
        />
      </View>
      <TouchableHighlight
        onPress={
          editable
            ? () =>
                launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  (res) => {
                    setImageData(res);
                    setImageRes(res);
                  },
                )
            : () => {}
        }
        underlayColor="white">
        {imageData && Object.entries(imageData).length > 0 ? (
          <View style={styles.imageContainer}>
            <Image
              style={{width: imageData.width, height: imageData.height}}
              source={{uri: imageData.uri}}
            />
          </View>
        ) : (
          <View style={[styles.imageContainer, {padding: 35}]}>
            <Icon name="image" size={80} color="#000" solid={true} />
          </View>
        )}
      </TouchableHighlight>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    zIndex: 999,
  },
  valid: {
    borderColor: 'gray',
    color: 'black',
  },
  invalid: {
    borderColor: '#fa98b1',
    color: 'red',
  },
  imageContainer: {
    alignItems: 'center',
    // marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: '#d1d1d1',
  },
});
