import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProfilePhoto from '../components/ProfilePhoto';
import { ScrollView } from 'react-native-gesture-handler';

// import { Card, Icon } from 'react-native-elements'
import SegmentedControlTab from "react-native-segmented-control-tab";
// import SegmentedControl from 'rn-segmented-control';

export default function UserProfileScreen({ navigation } : RootTabScreenProps<'UserProfile'>) {
    const [user, setUser] = useState(null);
    // const [tabIndex, setTabIndex] = React.useState(0);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSingleIndexSelect = (index: any) => {
        // For single Tab Selection SegmentedControlTab
        setSelectedIndex(index);
    };

    return (
        // <SafeAreaView style={styles.container}>
            
        // </SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <View style={{marginVertical: 20, height: 1, width: '80%'}}/> 
                <ProfilePhoto/>
                <Text style={styles.title}>User Profile Name</Text>
                <View style={{marginVertical: 5, height: 1, width: '80%'}}/> 
                <Text style={styles.contact}>User Profile Email</Text> 
                <View style={styles.separator}/>
                <SegmentedControlTab
                    values={['Bought', 'Sold']}
                    selectedIndex={selectedIndex}
                    onTabPress={handleSingleIndexSelect}
                    borderRadius={0}
                    tabsContainerStyle={{ height: 50, backgroundColor: '#FFFFFF' }}
                    tabStyle={{
                        backgroundColor: '#F2F2F2',
                        borderWidth: 0,
                        borderColor: 'transparent',
                    }}
                    activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
                    tabTextStyle={{ color: '#bd5319', fontWeight: 'bold' }}
                    activeTabTextStyle={{ color: '#5f712d' }}
                />
                {selectedIndex === 0 && (
                    <Text style={styles.tabContent}>Purchased Items

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                )}
                {selectedIndex === 1 && (
                    <Text style={styles.tabContent}> Sold Items</Text>
                )}
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#00356b',
    },
    contact: {
        fontSize: 17,
        color: "#4a4a4a",
      },
    separator: {
      marginVertical: 8,
      height: 1,
      width: '80%',
    },
    tabContent: {
        color: '#444444',
        fontSize: 18,
        margin: 24,
    },
  });