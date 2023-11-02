import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

import Loading from "./Loading";
import Toast from "./Toast";

const Notification = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    }, 5000);
  });

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.success && (
        <Toast
          msg={{ title: "Success", body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}

      {alert.error && (
        <Toast
          msg={{ title: "Error", body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}
    </div>
  );
};

export default Notification;
