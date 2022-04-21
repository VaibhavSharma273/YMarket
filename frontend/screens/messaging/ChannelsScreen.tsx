import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { normalize } from '../../components/TextNormalize';
import { Text, View } from '../../components/Themed';
import mock from '../messaging/data/channels_mock';
import { Header } from 'react-native-elements';

export default function ChannelsScreen({ navigation }: any){
    // 0 is buyers, 1 is sellers
    const [selectedType, setSelectedType] = useState(0);


    console.log(mock[0].id)

    const updateSelectedType = (selectedType: number) => () => {
        setSelectedType(() => selectedType);
      };

    const renderItems = ({ item }: { item:any }) => {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() =>
                navigation.push('Chats', { thread: item.id, user: mock[0].id })}>
                {selectedType == 0 ? <Text style={styles.listItemLabel}>{item.sender.email}</Text> :  
                    <Text style={styles.listItemLabel}>{item.receiver.email}</Text>
                }
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <Header
             backgroundColor='white'
             containerStyle={{
               borderBottomColor: '#e2e2e2',
               borderBottomWidth: 1
             }}
                centerComponent={<Text style={styles.headerText}>{'Messages'}</Text>}
            />

      <View style={styles.searchActionContainer}>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={updateSelectedType(0)}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>Buyers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1 && styles.searchActionBtnActive]} onPress={updateSelectedType(1)}>
          <Text style={[styles.searchActionLabel, selectedType === 1 && styles.searchActionLabelActive]}>Sellers</Text>
        </TouchableOpacity>
      </View>
            <View style={styles.list}>
            <FlatList
                data={(selectedType == 0 ? mock[0].received_convos : mock[0].sent_convos)}
                renderItem={renderItems}
            />
            </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
      },
      inputContainer: {
        marginTop: 8,
      },
      input: {
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        marginHorizontal: 8,
        padding: 12,
      },
      searchActionContainer: {
        borderRadius: 8,
        flexDirection: 'row',
        margin: 8,
      },
      searchActionBtn: {
        backgroundColor: '#fff',
        borderColor: '#000',
        flex: 1,
        fontSize: 16,
        padding: 8
      },
      searchLeftActionBtn: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginRight: 0,
      },
      searchRightActionBtn: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginLeft: 0,
      },
      searchActionBtnActive: {
        backgroundColor: '#0f4d92',
        borderColor: '#0f4d92',
        borderRadius: 5,
      },
      searchActionLabel: {
        color: 'black',
        fontSize: normalize(15),
        textAlign: 'center',
        fontFamily: 'Arial'
      },
      searchActionLabelActive: {
        color: 'white',
        fontSize: normalize(15),
        textAlign: 'center',
        fontFamily: 'Arial'
      },
      list: {
        flex: 1,
      },
      listItem: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 8,
        paddingVertical: 20,
        paddingBottom: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
      },
      listItemImage: {
        width: 32,
        height: 32,
        marginRight: 8
      },
      listItemLabel: {
        fontFamily: 'Arial',
        fontSize: normalize(17),
      },
      headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#0f4d92',
        fontSize: normalize(24),
      },
    });
    