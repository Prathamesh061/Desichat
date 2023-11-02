import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { NOTIFICATION_TYPES } from "./redux/actions/notificationAction";
import { MESS_TYPES } from "./redux/actions/messageAction";

const SocketClient = () => {
  const { auth, socket, notification, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  // joinUser
  useEffect(() => {
    socket.emit("joinUser", auth.user);
  }, [socket, auth.user]);

  // Likes
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  // Comments
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  // Follow
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  // Notification
  useEffect(() => {
    socket.on("createNotificationToClient", (msg) => {
      dispatch({ type: NOTIFICATION_TYPES.CREATE_NOTIFICATION, payload: msg });
    });

    return () => socket.off("createNotificationToClient");
  }, [socket, dispatch, notification.sound]);

  useEffect(() => {
    socket.on("removeNotificationToClient", (msg) => {
      dispatch({ type: NOTIFICATION_TYPES.REMOVE_NOTIFICATION, payload: msg });
    });

    return () => socket.off("removeNotificationToClient");
  }, [socket, dispatch]);

  // Message
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });

      dispatch({
        type: MESS_TYPES.ADD_USER,
        payload: {
          ...msg.user,
          text: msg.text,
          media: msg.media,
        },
      });
    });

    return () => socket.off("addMessageToClient");
  }, [socket, dispatch]);

  // Check User Online / Offline
  useEffect(() => {
    socket.emit("checkUserOnline", auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on("checkUserOnlineToMe", (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id });
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on("checkUserOnlineToClient", (id) => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBALTYPES.ONLINE, payload: id });
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  // Check User Offline
  useEffect(() => {
    socket.on("CheckUserOffline", (id) => {
      dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
    });

    return () => socket.off("CheckUserOffline");
  }, [socket, dispatch]);

  return <></>;
};

export default SocketClient;
