import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { get } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import {
  MESS_TYPES,
  getConversations,
} from "../../redux/actions/messageAction";

const LeftSide = () => {
  const { auth, message, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();

    if (!search && allUsers.length > 0) return setSearchUsers(allUsers);

    try {
      const res = await get(
        `search?username=${search}&self=${auth?.user?.username}`,
        auth.token
      );

      if (!search) {
        setAllUsers(res.data.users);
      }

      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);

    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });

    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });

    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  const isOnline = (user) => {
    return online.indexOf(user._id) >= 0;
  };

  useEffect(() => {
    if (message.firstLoad) return;

    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  useEffect(() => {
    handleSearch();
  });

  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstLoad, dispatch]);

  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Enter to Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
      </form>

      <div className="message_chat_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  {isOnline(user) ? (
                    <i className="fas fa-circle" style={{ color: "green" }} />
                  ) : (
                    auth.user.following.find(
                      (item) => item._id === user._id
                    ) && (
                      <i className="fas fa-circle" style={{ color: "gray" }} />
                    )
                  )}
                </UserCard>
              </div>
            ))}
          </>
        )}

        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load More
        </button>
      </div>
    </>
  );
};

export default LeftSide;
