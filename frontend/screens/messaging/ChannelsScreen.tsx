import React, { useState, useContext, useEffect, useRef, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { normalize } from '../../components/TextNormalize';
import { Text, View } from '../../components/Themed';
import mock from '../messaging/data/channels_mock';
import { Header } from 'react-native-elements';
import API from '../../api/ymarket_api';
import AppContext from '../AppContext';
import { getToken, setToken, deleteToken } from '../../storage/tokenStorage';
import LoadingIndicator from '../../components/LoadingIndicator';

export default function ChannelsScreen({ navigation }: any){
    // 0 is received, 1 is sent
    const [selectedType, setSelectedType] = useState(0);
    const selectedTypeRef = useRef(0)
    const myContext = useContext(AppContext);
    const userId = myContext.user;
    const [refreshing, setRefreshing] = useState(false);
    const [sentThreads, setSentThreads] = useState<Array<any>>([]);
    const [receivedThreads, setReceivedThreads] = useState<Array<any>>([]);

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      getUserThreads(selectedTypeRef.current);
      setRefreshing(false);
  }, [refreshing]);

    const getUserThreads = async (isSent: number) => {
      const received_path = 'api/messages/thread/received/' + userId;
      const sent_path = 'api/messages/thread/sent/' + userId;
      if (isSent) {
        const sent_response = await API.get(sent_path)
        .then((sent_response) => {
            setSentThreads(sent_response.data)
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        const received_response = await API.get(received_path)
        .then((received_response) => {
            setReceivedThreads(received_response.data)
        })
        .catch((error) => {
          console.log(error);
        });
      }
      // var received_convos: never[] = []
      // var sent_convos: never[] = []
      // const rresponse = await API.get(rpath)
      //     .then((rresponse) => {
      //         received_convos = rresponse.data;
      //         setReceivedThreads(received_convos)
      //         // console.log(received_convos)
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //   });
      // const spath = 'api/messages/thread/sent/' + userId;
      // const sresponse = await API.get(spath)
      //   .then((sresponse) => {
      //       sent_convos = sresponse.data;
      //       setSentThreads(sent_convos)
      //       // console.log(sent_convos)
      //   })
      //   .catch((error) => {
      //     console.log(error);
      // });
      // setUser({received: received_convos, sent: sent_convos})

    };

    useEffect(() => {
      getUserThreads(0)
      getUserThreads(1)
    }, []);

    const renderItems = ({ item }: { item:any }) => {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() =>
                navigation.push('Chats', { title: (selectedType == 0 ? item.sender.email : item.receiver.email), thread: item.id, user: userId, })}>
                  <Text style={styles.listItemLabel}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    const memoizedThreads = useMemo(() => renderItems, [sentThreads, receivedThreads]);

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
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchLeftActionBtn, selectedType === 0 && styles.searchActionBtnActive]} onPress={() => {setSelectedType(0), (selectedTypeRef.current = 0);}}>
          <Text style={[styles.searchActionLabel, selectedType === 0 && styles.searchActionLabelActive]}>Received</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchActionBtn, styles.searchRightActionBtn, selectedType === 1 && styles.searchActionBtnActive]} onPress={() => {setSelectedType(1), (selectedTypeRef.current = 1);}}>
          <Text style={[styles.searchActionLabel, selectedType === 1 && styles.searchActionLabelActive]}>Sent</Text>
        </TouchableOpacity>
      </View>
            <View style={styles.list}>
            <FlatList
                data={(selectedType ? sentThreads : receivedThreads)}
                renderItem={memoizedThreads}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            </View>

            {/* <TouchableOpacity  onPress={onLogoutPressed} test-id="login-button">
                <Text>Test÷</Text>
            </TouchableOpacity> */}

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
    