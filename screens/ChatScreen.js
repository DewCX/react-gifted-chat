import { auth, db } from '../firebase';
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ( {navigation} ) => {
    const [messages, setMessages] = useState([])

    // useEffect(() => {
    //     setMessages ([
    //         {
    //             _id:1,
    //             text:"Hello",
    //             createdAt: new Date(),
    //             user: {
    //                 _id:2,
    //                 name:"React Native",
    //                 avatar:"https://upload.wikimedia.org/wikipedia/tr/6/6b/Gandalf.jpg",
    //             },
    //         },
    //     ])
    // }, [])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').orderBy('createdAt','desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc=>({
                _id:doc.data()._id,
                createdAt:doc.data().createdAt.toDate(),
                text:doc.data().text,
                user:doc.data().user
            }))
        ))
        return unsubscribe;

    }, [])
        

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        }=messages[0]
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        })
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
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user = {{
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.displayName,
            avatar: auth?.currentUser?.photoURL
        }}
        />
    )
}

export default ChatScreen;