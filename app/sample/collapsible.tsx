import React, {useState} from 'react';
import {Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

const CollapsibleSample = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState([]);

  const renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSection(activeSections);
  };
  return (
    <>
      <Button
        title="switch collapse"
        onPress={() => setIsCollapsed(!isCollapsed)}></Button>
      <Collapsible collapsed={isCollapsed}>
        <View>
          <Text>test</Text>
        </View>
      </Collapsible>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSection}
        renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  headerText: {
    flex: 1,
  },
});

export default CollapsibleSample;
