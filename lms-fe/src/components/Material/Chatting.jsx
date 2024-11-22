import AuthManger from "../../hooks/api/AuthManger";
import useAxios from "../../hooks/api/useAxios";
import { Fragment, useEffect, useRef, useState } from "react";
import "../../styles/Material/Chatting.css";

import { Client } from "@stomp/stompjs";
import { Button, Divider, Grid, Stack, TextField } from "@mui/material";
import {decodeToken} from "../../authentication/decodeToken.jsx";

function Chatting({liveId, stompClient}) {

    const {fetchData: fetchChatData, data: chatData, error: chatError,} = useAxios();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchChatData(`/live/${liveId}/chat`, "get");
    }, []);

    useEffect(() => {
        //console.log("실행됨" + chatData);
        if (chatData) setMessages([...messages, ...chatData]);

        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/pub/join/${liveId}`,
                body: JSON.stringify({
                    username: decodeToken(),
                }),
            });
            const subscribe = stompClient.subscribe(`/sub/chat/${liveId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
            return () => subscribe.unsubscribe();
        }

    }, [chatData]);


    const handleSend = () => {
        if (input.trim() && stompClient) {
            const message = {
                username:decodeToken(),
                message: input,
            };
            stompClient.publish({
                destination: `/pub/chat/${liveId}`, // 서버에서 구독하는 경로로 변경
                body: JSON.stringify(message),
            });
            setInput("");
        }
    };

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        //messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className="chat-container">
            <h3>채팅</h3>
            <div className="chat-window">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${message.username}`}
                        >
                            <span>{message.username} </span>
                            <span>{message.message}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chatting;
