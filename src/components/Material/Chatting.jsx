import AuthManger from "../../hooks/api/AuthManger";
import useAxios from "../../hooks/api/useAxios";
import { Fragment, useEffect, useRef, useState } from "react";
import "../../styles/Material/Chatting.css";

import { Client } from "@stomp/stompjs";
import { Button, Divider, Grid, Stack, TextField } from "@mui/material";

function Chatting() {
    const {
        fetchData: fetchChatData,
        data: chatData,
        error: chatError,
    } = useAxios();
    const { Register } = AuthManger();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const stompClientRef = useRef(null);

    useEffect(() => {
        fetchChatData("/chat/room/1111/chats", "get");
    }, []);

    useEffect(() => {
        console.log("실행됨" + chatData);
        if (!chatData) return;
        console.log("실행후" + chatData);
        setMessages([...messages, ...chatData]);

        // STOMP 클라이언트 설정
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws", // STOMP 서버의 WebSocket URL로 변경
            // brokerURL: 'ws://192.168.50.8:8080/ws', // STOMP 서버의 WebSocket URL로 변경
            onConnect: () => {
                console.log("Connected");
                client.subscribe("/sub/chat/room/1111", (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        receivedMessage,
                    ]);
                });
            },
            onStompError: (frame) => {
                console.error(
                    "Broker reported error: " + frame.headers["message"]
                );
                console.error("Additional details: " + frame.body);
            },
            connectHeaders: {
                Authorization: localStorage.getItem("access"),
            },
        });

        // 클라이언트 활성화
        client.activate();
        stompClientRef.current = client;

        return () => {
            if (client) client.deactivate();
        };
    }, [chatData]);

    const handleSend = () => {
        if (input.trim() && stompClientRef.current) {
            const message = {
                message: input,
                sender: "1",
                roomId: 1111,
                type: "TALK",
            };
            stompClientRef.current.publish({
                destination: "/pub/chat/send", // 서버에서 구독하는 경로로 변경
                body: JSON.stringify(message),
            });
            //setMessages([...messages, message]);
            setInput("");
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);

    return (
        <div className="chat-container">
            <h3>채팅</h3>
            <div className="chat-window">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${message.sender}`}
                        >
                            <span>{message.sender} </span>
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
