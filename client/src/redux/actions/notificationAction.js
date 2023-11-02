import { GLOBALTYPES } from "./globalTypes";
import { postReq, deleteReq, get, patch } from "../../utils/fetchData";

export const NOTIFICATION_TYPES = {
  GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
  CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
  UPDATE_NOTIFICATION: "UPDATE_NOTIFICATION",
  UPDATE_SOUND: "UPDATE_SOUND",
  DELETE_ALL_NOTIFICATIONS: "DELETE_ALL_NOTIFICATIONS",
};

export const createNotification =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postReq("notification", msg, auth.token);

      socket.emit("createNotification", {
        ...res.data.notification,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const removeNotification =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      await deleteReq(`notification/${msg.id}?url=${msg.url}`, auth.token);

      socket.emit("removeNotification", msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getNotifications = (token) => async (dispatch) => {
  try {
    const res = await get("notifications", token);

    dispatch({
      type: NOTIFICATION_TYPES.GET_NOTIFICATIONS,
      payload: res.data.notifications,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const isReadNotification =
  ({ msg, auth }) =>
  async (dispatch) => {
    dispatch({
      type: NOTIFICATION_TYPES.UPDATE_NOTIFICATION,
      payload: { ...msg, isRead: true },
    });
    try {
      await patch(`/isReadNotification/${msg._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteAllNotifications = (token) => async (dispatch) => {
  dispatch({ type: NOTIFICATION_TYPES.DELETE_ALL_NOTIFICATIONS, payload: [] });
  try {
    await deleteReq("deleteAllNotification", token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
