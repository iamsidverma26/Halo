import React from "react";
import Message from "./Message.jsx";
import useGetMessages from "../hooks/useGetMessages.jsx";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage.jsx";
const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  // console.log(messages);
  return (
    <div className="px-4 py-2 flex-1 overflow-auto">
      {Array.isArray(messages) &&
        messages?.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
    </div>
  );
};

export default Messages;
