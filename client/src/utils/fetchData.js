import axios from "axios";

export const get = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postReq = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const put = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patch = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteReq = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
