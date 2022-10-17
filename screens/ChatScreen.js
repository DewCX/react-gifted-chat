import { auth } from '../firebase';
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ( {navigation} ) => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        setMessages ([
            {
                id:1,
                text:"Hello",
                createdAt: new Date(),
                user: {
                    _id:2,
                    name:"React Native",
                    avatar:"https://upload.wikimedia.org/wikipedia/tr/6/6b/Gandalf.jpg",
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                <Avatar
                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL
                    }}
                />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 30
                    }}
                        onPress={signOut}
                    >
                        <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    }, [])



    const signOut = () => {
        auth.signOut().then(() => {
            //Sign-out successful !!
            navigation.replace('Login')
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user = {{
            _id:1,
        }}
        />
    )
}

export default ChatScreen;