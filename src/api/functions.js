import axios from "axios";
import { ENDPOINT } from "../utils/constants";

const loginWithEmailAndPassword = async ({ auth, db, email, password }) => {
  const res = await axios
    .post(`${ENDPOINT}signin`, {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      return response.data.user;
    })
    .catch((error) => {
      return {
        error: true,
        message:
          error?.response?.data?.message ?? JSON.stringify(error.message),
      };
    });

  return res;
};

const registerWithEmailAndPassword = async ({ email, password }) => {
  const res = await axios
    .post(`${ENDPOINT}signup`, {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log("in then");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      return response.data.user;
    })
    .catch((error) => {
      return {
        error: true,
        message:
          error?.response?.data?.message ?? JSON.stringify(error.message),
      };
    });

  return res;
};

//TODO: update emails content and reset password page style
const resetPassword = async (email) => {
  const res = await axios
    .post(`${ENDPOINT}reset-password`, {
      email: email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getUsers = async () => {
  const res = await axios
    .get(`${ENDPOINT}users`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const deleteUserById = async (id) => {
  console.log(id);
  console.log(JSON.parse(localStorage.getItem("token")));
  const res = await axios
    .delete(`${ENDPOINT}user/${id}`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const toggleAdminRights = async (id) => {
  const res = await axios
    .put(
      `${ENDPOINT}toggleAdminRights`,
      {
        id: id,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const getCompanies = async (id) => {
  const res = await axios
    .get(`${ENDPOINT}companies`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const updateUserById = async (data) => {
  const res = await axios
    .put(
      `${ENDPOINT}user`,
      {
        id: data.id,
        email: data.email,
        is_admin: data.is_admin,
        is_premium: data.is_premium,
        name: data.name,
        company: data.company_id,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const createUser = async (data) => {
  const res = await axios
    .post(
      `${ENDPOINT}user`,
      {
        company_id: data.company_id,
        email: data.email,
        is_admin: data.is_admin,
        is_premium: data.is_premium,
        name: data.name,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

export {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  resetPassword,
  logout,
  getUsers,
  deleteUserById,
  toggleAdminRights,
  getCompanies,
  updateUserById,
  createUser,
};
