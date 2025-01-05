import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import HomePage from "./components/HomePage.jsx";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { useEffect } from "react";
import { setSocket } from "./redux/socketSlice.js";
import { setOnlineUsers } from "./redux/userSlice.js";
import { BASE_URL } from "./main.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(`${BASE_URL}`, {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="h-screen p-4 flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
