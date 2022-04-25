import React, { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../../components/Themed';
import { GiftedChat, Bubble, InputToolbar, MessageText, Composer, Time } from 'react-native-gifted-chat';
import { normalize } from '../../components/TextNormalize';
import API from '../../api/ymarket_api';
import { getToken } from '../../storage/tokenStorage';
import { hostURL } from '../../constants/url';

export default function ChatsScreen({ navigation, route }: any) {
    const [messages, setMessages] = useState<Array<any>>([]);
    const thread_id = route.params.thread;
    const user = route.params.user;
    const testTitle = 'No Title';
    const title = route.params.title ? route.params.title : testTitle;
    const recipient = useRef('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getThread();
        setRefreshing(false);
    }, [refreshing]);

    const getThread = async () => {
        let message_id = 0;
        let messageList: any[] = [];
        const messagesArray: any[] = [];

        const path = 'api/messages/thread/' + thread_id;
        const response = await API.get(path)
            .then((response) => {
                const message_list = response.data.messages;
                const sender = response.data.sender;
                const receiver = response.data.receiver;

                if (sender === user) {
                    recipient.current = receiver;
                } else {
                    recipient.current = sender;
                }

                messageList = message_list;
            })
            .catch((error) => {
                console.log(error);
            });

        for (let i = 0; i < messageList.length; i++) {
            messagesArray.unshift({
                _id: message_id,
                text: messageList[i].body,
                createdAt: messageList[i].sent_at,
                user: {
                    _id: messageList[i].receiver == user ? 2 : 1,
                    sent: true,
                },
            });
            message_id = message_id + 1;
        }
        setMessages(messagesArray);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" color="#0F4D92" size={30} style={{ marginBottom: -3 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        getThread();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        const updateBackend = async () => {
            const token = await getToken('access');
            const path = hostURL + 'api/messages/thread/' + thread_id;
            const form_data = new FormData();
            form_data.append('body', messages[0].text);
            form_data.append('sender', user);
            form_data.append('receiver', recipient.current);
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
                    console.log(error);
                });
        };
        updateBackend();
    }, []);

    const renderBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: { backgroundColor: '#ededed', padding: 4 },
                    right: { backgroundColor: '#0F4D92', padding: 4 },
                }}
            />
        );
    };

    const renderMessageText = (props: any) => (
        <MessageText
            {...props}
            textStyle={{
                left: { color: 'black' },
                right: { color: 'white' },
            }}
            customTextStyle={{ fontSize: normalize(15), lineHeight: normalize(15) }}
        />
    );

    const renderInputToolbar = (props: any) => (
        <InputToolbar
            {...props}
            containerStyle={{
                paddingTop: 6,
                backgroundColor: '#ededed',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ededed',
                borderTopColor: '#ededed',
                marginHorizontal: 10,
                marginBottom: 10,
            }}
            primaryStyle={{ alignItems: 'center' }}
        />
    );

    const renderComposer = (props: any) => (
        <Composer {...props} placeholderTextColor={'gray'} containerStyle={{ margin: 10 }} />
    );

    const renderTime = (props: any) => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: 'black',
                    },
                    right: {
                        color: 'white',
                    },
                }}
            />
        );
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{
                        paddingLeft: 15,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" color="#0F4D92" size={30} />
                </TouchableOpacity>
                <View style={styles.name_container}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                <View style={{ paddingRight: 15 }} />
            </View>
            <View
                style={{
                    borderBottomColor: '#d3d3d3',
                    borderBottomWidth: 1,
                    width: '95%',
                    alignSelf: 'center',
                    paddingTop: '3%',
                }}
            />

            <GiftedChat
                messages={messages}
                scrollToBottom={true}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderMessageText={renderMessageText}
                renderComposer={renderComposer}
                renderChatFooter={() => <View style={{ height: '5%' }} />}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderAvatar={null}
                renderTime={renderTime}
                listViewProps={{
                    inverted: true,
                    refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
                }}
            />
        </View>
    );
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
    name_container: {
        justifyContent: 'center',
        paddingRight: 10,
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#0f4d92',
        fontSize: normalize(17),
    },
    header: {
        paddingTop: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
