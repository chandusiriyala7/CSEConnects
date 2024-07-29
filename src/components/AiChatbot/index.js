import { useState, useEffect } from 'react';
import './index.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = 'sk-proj-OWHamlKIYoZVUUA8OckUT3BlbkFJIpfmrDTICnjnao2UccUs';

function AiChatbot() {
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token');
        if (jwtToken === undefined) {
            navigate('/login');
            alert('Login to Explore');
        }
    }, [navigate]);

    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am a Chatbot.",
            sender: "ChatGPT",
            direction : "incoming",
        }
    ]);

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing",
        };

       
        setMessages(prev => [...prev,newMessage]);
        setTyping(true);
        console.log(messages)

       const response = await axios({
        url : "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCHwbTbwEJOE4G4CzhRrGErXTCq2AEG3C8",
        method : "post",
        data : {
        contents:[
            {"role": "user",
              "parts":[{"text": message}]},
            ],
        }
       },)
       const data = response['data']['candidates'][0]['content']['parts'][0]['text']
       console.log(data)

       const newResponse = {
        message : data,
        sender : 'ChatGPT',
        direction : 'incoming',
       }
       setMessages(prev => [...prev ,newResponse])
       setTyping(false);

    };
    console.log(messages)


    return (
        <div className='App'>
            <strong><h1>CSEConnects.Chatbot</h1></strong>
            <div style={{ position: "relative", height: "90vh", width: "100vw" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={typing ? <TypingIndicator content="Chatbot is typing..." /> : null}>
                            {messages.map((message, i) => (
                                <Message key={i} model={message} />
                            ))}
                        </MessageList>
                        <MessageInput placeholder='Type message here' onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default AiChatbot;
