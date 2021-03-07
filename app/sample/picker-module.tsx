import React, {MutableRefObject, useState} from 'react';
import {StyleSheet} from 'react-native';
import ReactNativePickerModule from 'react-native-picker-module';

type Props = {
  pickerRef: MutableRefObject<undefined>;
  dataset: string[];
  defaultValue: string;
  onChange: (...event: any[]) => void;
};

export const SamplePickerModule = (props: Props) => {
  const {dataset, defaultValue, pickerRef, onChange} = props;
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : '');

  return (
    <ReactNativePickerModule
      pickerRef={pickerRef}
      value={value}
      title={'単位の選択'}
      items={dataset}
      titleStyle={styles.titleStyle}
      itemStyle={styles.colorWhite}
      selectedColor="#FC0"
      confirmButton="選択"
      confirmButtonEnabledTextStyle={styles.colorWhite}
      confirmButtonDisabledTextStyle={styles.colorGrey}
      cancelButton="キャンセル"
      cancelButtonTextStyle={styles.colorWhite}
      confirmButtonStyle={styles.backgroundBlack}
      cancelButtonStyle={styles.backgroundBlack}
      contentContainerStyle={styles.backgroundBlack}
      onCancel={() => {
        console.log('Cancelled');
      }}
      onValueChange={(val) => {
        console.log('value: ', val);
        setValue(val);
        onChange(val);
      }}
    />
  );
};

const styles = StyleSheet.create({
  backgroundBlack: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
  colorWhite: {
    color: 'white',
  },
  colorGrey: {
    color: 'grey',
  },
  titleStyle: {
    color: 'white',
    fontSize: 20,
    padding: 5,
  },
});
