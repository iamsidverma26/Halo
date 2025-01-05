import React from "react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "../main.jsx";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUsers?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-4">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a Message................."
          className="border bg-slate-900 p-3 text-sm rounded-lg w-full block "
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 pr-4 items-center"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
