import React from 'react';
import {SectionList, View} from 'react-native';
import {MCi} from '../../components/common/icons';
import {shadowStyles} from '../../global/styles';
import {SettingsListSectionHeader} from './list-section-header';
import {SettingsListItem} from './setting-list-item';

const IconWrapper = (props) => (
  <View
    style={[
      shadowStyles('black').boxShadow,
      {padding: 8, borderRadius: 8, backgroundColor: '#090909'},
    ]}>
    {props.children}
  </View>
);

const StyledSearchItemSeparator = (props) => (
  <View style={{height: 1, width: '100%', background: 'rgba(0, 0, 0, 0.05)'}}>
    {props.children}
  </View>
);

const settingsData: {
  title: string;
  icon: JSX.Element;
  data: string[];
}[] = [
  {
    title: '設定値の変更',
    icon: <IconWrapper>{MCi('database-edit', '#fff', 20)}</IconWrapper>,
    data: ['日付変更時間', 'カロリーの目安', '水分の目安'],
  },
  {
    title: 'ヘルプ',
    icon: <IconWrapper>{MCi('timeline-help-outline', '#fff', 20)}</IconWrapper>,
    data: ['使い方について', 'フィードバック'],
  },
  {
    title: '個人情報保護方針',
    icon: (
      <IconWrapper>{MCi('play-protected-content', '#fff', 20)}</IconWrapper>
    ),
    data: ['プライバシーポリシー'],
  },
];

export const SettingsList = () => {
  return (
    <SectionList
      sections={settingsData}
      style={{flex: 1, width: '100%', marginTop: 16}}
      showsVerticalScrollIndicator={false}
      bounces={false}
      stickySectionHeadersEnabled={false}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={StyledSearchItemSeparator}
      keyExtractor={(it) => it}
      renderItem={(props) => {
        const isFirstElement = props.index === 0;
        const isLastElement = props.index === props.section.data.length - 1;

        return (
          <SettingsListItem
            item={props.item}
            isFirstElement={isFirstElement}
            isLastElement={isLastElement}
          />
        );
      }}
      renderSectionHeader={({section: {title, icon}}) => (
        <SettingsListSectionHeader icon={icon} title={title} />
      )}
    />
  );
};
