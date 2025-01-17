import React, { useEffect } from "react";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../main.jsx";

const useGetMessages = () => {
  const { selectedUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUsers?._id}`
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUsers?._id, setMessages]);
};

export default useGetMessages;
