import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Vibration,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { Text, View } from '../../components/Themed';
import { GiftedChat, Bubble, InputToolbar, Message, MessageText, Composer, Time, Avatar } from 'react-native-gifted-chat';
import { normalize } from '../../components/TextNormalize';
import API from '../../api/ymarket_api';
import mock from '../messaging/data/mock';
import { getToken, setToken, deleteToken } from '../../storage/tokenStorage';

export default function ChatsScreen({ navigation, route }: any){
    const [messages, setMessages] = useState([]);
    const thread_id = route.params.thread
    const user = route.params.user
    const testTitle = 'test'
    const title = (route.params.title ? route.params.title : testTitle)
    const [recipient, setRecipient] = useState('')

    var message_id = 0;
    var messageList: never[] = []
    var messagesArray: never[] = []

    const getThread = async () => {
      const path = 'api/messages/thread/' + thread_id;
      const response = await API.get(path)
          .then((response) => {
              const message_list = response.data.messages
              const sender = response.data.sender
              const receiver = response.data.receiver

              if (sender == user)
              {
                setRecipient(receiver)
              }
              else
              {
                setRecipient(sender)
              }

              messageList = message_list
              console.log('get request:' + message_list)
          })
          .catch((error) => {
            console.log(error);
        });

      for (let i = 0; i < messageList.length; i++){
        messagesArray.unshift(
        {
            _id: message_id,
            text: messageList[i].body,
            createdAt: messageList[i].sent_at,
            user: {
              _id: (messageList[i].receiver == user) ? 2 : 1,
              sent: true,
          },
        });
        message_id = message_id + 1;
      }

      setMessages(messagesArray)
    }

    useLayoutEffect(() => {
      navigation.setOptions({
          headerLeft: () => (
              <TouchableOpacity style={{
                  marginRight: 10
              }}
                  onPress={ () => navigation.goBack() }
              >
                <FontAwesome name="angle-left" color='#0F4D92' size={30} style={{ marginBottom: -3 }}/>
              </TouchableOpacity>
          )
      })
  }, [navigation]);

  useEffect(() => {
    getThread()
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const updateBackend = async () => {
      const token = await getToken('access');
      const path = 'api/messages/thread/' + thread_id;
      const form_data = new FormData();
      form_data.append('body', messages.text);
      form_data.append('sender', user);
      form_data.append('receiver', recipient);
      console.log('PUT HERE')
      const response = await fetch(path, {
          method: 'PUT',
          headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM',
              Authorization: 'Bearer ' + token,
          },
          body: form_data,
      })
          .then((response) => {
              console.log('messages update success!');
          })
          .catch((error) => {
              console.log('error.response');
          });
    }
    updateBackend()
}, [])

  const renderBubble= (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
            left: {backgroundColor: 'gray', padding: 4},
            right: {backgroundColor: '#0F4D92', padding: 4},
        }}
      />
    );
  }

  const renderMessageText = (props: any) => (
    <MessageText
      {...props}
      textStyle={{
        left: { color: 'white' },
        right: { color: 'white' },
      }}
      customTextStyle={{ fontSize: normalize(15), lineHeight: normalize(15) }}
    />)

  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        paddingTop: 6,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderTopColor: '#d3d3d3',
      }}
      primaryStyle={{ alignItems: 'center' }}
    />
  );

  const renderComposer = (props: any) => (
    <Composer
      {...props}
      placeholderTextColor= {'gray'}
    />
  );

  const renderTime = (props: any) => {
    return (
      <Time
      {...props}
        timeTextStyle={{
          left: {
            color: '#d3d3d3',
          },
          right: {
            color: '#d3d3d3',
          },
        }}
      />
    );
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header
        backgroundColor='white'
        containerStyle={{
          borderBottomColor: '#e2e2e2',
          borderBottomWidth: 1
        }}
        leftComponent={ <TouchableOpacity style={{
                  marginRight: 10
              }}
                  onPress={ () => navigation.goBack() }
              >
                <FontAwesome name="angle-left" color='#0F4D92' size={30} style={{ marginBottom: -3 }}/>
              </TouchableOpacity>}
        centerComponent={<Text style={styles.headerText}>{title}</Text>}
      />
    <GiftedChat
      messages={messages}
      scrollToBottom = {true}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderMessageText={renderMessageText}
      renderComposer = {renderComposer}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderAvatar={null}
      renderTime ={renderTime}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    headerText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#0f4d92',
      fontSize: normalize(24),
    },
});
