import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { BASE_URL, createSocketConnection } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const myFirstName = user?.firstName;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map(msg => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text
      };
    })
    setMessages(chatMessages);
  };

  useEffect(()=>{
    fetchChat();
  },[]);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    const socket = createSocketConnection();
    // As soon as the page loads, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      myFirstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(`message received in FE via ${firstName} : ${text}`);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      console.log("socket disconnected");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    console.log(`send message from FE by ${myFirstName} : ${newMessage}`);

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat with {targetUserId}</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          const headerCSS =
            msg.firstName === myFirstName
              ? "chat-header ml-auto"
              : "chat-header";
          const bubbleCSS =
            msg.firstName === myFirstName
              ? "chat-bubble ml-auto"
              : "chat-bubble";
          const startEndCSS =
            msg.firstName === myFirstName ? "chat chat-end" : "chat chat-start";
          return (
            <div key={index} className={startEndCSS}>
              <div className={headerCSS}>{msg.firstName} {msg.lastName}</div>
              <div className={bubbleCSS}>{msg.text}</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
