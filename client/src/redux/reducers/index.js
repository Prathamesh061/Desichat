import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePosts from "./postReducer";
import modal from "./modalReducer";
import detailPost from "./detailPostReducer";
import suggestions from "./suggestionsReducer";
import socket from "./socketReducer";
import notification from "./notificationReducer";
import message from "./messageReducer";
import online from "./onlineReducer";

export default combineReducers({
  auth,
  alert,
  profile,
  status,
  homePosts,
  modal,
  detailPost,
  suggestions,
  socket,
  notification,
  message,
  online,
});
