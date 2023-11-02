import React from "react";
import Avatar from "../Avatar";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";

const MsgDisplay = ({ user, msg, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>

      <div className="you_content">
        {user._id === auth.user._id && (
          <i
            className="fas fa-trash text-danger"
            onClick={handleDeleteMessages}
          />
        )}

        <div>
          {msg.text && <div className="chat_text">{msg.text}</div>}
          {msg.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url)
                : imageShow(item.url)}
            </div>
          ))}
        </div>
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
