import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import Avatar from "../Avatar";
import NotificationModal from "../NotificationModal";

const Menu = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "chat", path: "/message" },
  ];

  const { auth, notification } = useSelector((state) => state);
  const dispatch = useDispatch();

  const count = notification.data.reduce((count, noti) => {
    if (!noti.isRead) {
      return ++count;
    }
    return count;
  }, 0);

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 active`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span
              className="material-icons"
              style={{ color: notification.data.length > 0 ? "crimson" : "" }}
            >
              notifications
            </span>

            {count > 0 && <span className="notification_length">{count}</span>}
          </span>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: "translateX(60px)" }}
          >
            <NotificationModal />
          </div>
        </li>

        <li className="nav-item" style={{ opacity: 1 }}>
          <span
            className="nav-link"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Profile
            </Link>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
