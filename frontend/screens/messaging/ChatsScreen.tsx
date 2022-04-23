import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Vibration,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { Text, View } from '../../components/Themed';
import { GiftedChat, Bubble, InputToolbar, Message, MessageText, Composer, Time, Avatar } from 'react-native-gifted-chat';
import { normalize } from '../../components/TextNormalize';
import mock from '../messaging/data/mock';

export default function ChatsScreen({ navigation, route }: any){
    const [messages, setMessages] = useState([]);
    const thread_id = route.params.thread
    const user = route.params.user

    var message_id = 0;

    const messageList = mock[0].messages
    var messagesArray: never[] = []

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

  const genMessages = async() => {
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
  }

  useEffect(() => {
    genMessages()
    setMessages(messagesArray)
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
        centerComponent={<Text style={styles.headerText}>Title</Text>}
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
