import React from "react";
import { useSelector } from "react-redux";

const Avatar = ({ src, size, user }) => {
  const { online } = useSelector((state) => state);

  const isOnline = () => {
    return user?._id && online.indexOf(user._id) >= 0;
  };

  return (
    <div className="avatarContainer">
      <img src={src} alt="avatar" className={size} />
      {user &&
        (isOnline() ? (
          <i className="fas fa-circle" style={{ color: "green" }} />
        ) : (
          <i className="fas fa-circle" style={{ color: "gray" }} />
        ))}
    </div>
  );
};

export default Avatar;
