import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat';
import GlobalApi from '../Services/GlobalApi';

export default function ChatScreen() {
    const param = useRoute().params;
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedChatFace, setSelectedChatFace] = useState([]);
    useEffect(() => {

        setSelectedChatFace(param?.selectedFace)
        setMessages([
            {
                _id: 1,
                text: 'Hello, I am '+param?.selectedFace?.name+', How can I help you?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: param?.selectedFace?.image,
                },
            },
        ])}, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        setLoading(true)
        if(messages[0].text)
        {
            getBardResp(messages[0].text);
        }
    }, [])


    const getBardResp = (msg)=>{
        GlobalApi.getBardApi(msg).then(resp=>{
            if (resp.data.resp[1].content)
            {
                const chatAPIResp={
                    _id: Math.random()* (9999999 - 1),
                    text: resp.data.resp[1].content,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: param?.selectedFace?.image,
                    }
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, chatAPIResp))
                setLoading(false);
            }
            else
            {
                setLoading(false)
                const chatAPIResp={
                    _id: Math.random()* (9999999 - 1),
                    text: "Sorry, I can't help with it",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: param?.selectedFace?.image,
                    }
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, chatAPIResp))
            }
        })
    }
    useEffect(()=>{
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <GiftedChat
            messages={messages}
            isTyping={loading}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            />
        </View>
    )
}