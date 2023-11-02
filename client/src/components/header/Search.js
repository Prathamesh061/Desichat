import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../assets/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await get(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        className="form-control"
        style={{ maxWidth: "100%", minWidth: "300px" }}
        value={search}
        id="search"
        title="Enter to Search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />

      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>Enter to Search</span>
      </div>

      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: search.length }}
      >
        &times;
      </div>

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>

      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
        {search && users.length === 0 && (
          <h5
            style={{
              textAlign: "center",
              padding: "20px",
              border: "solid 1px lightgray",
            }}
          >
            User Not Found
          </h5>
        )}
      </div>
    </form>
  );
};

export default Search;
