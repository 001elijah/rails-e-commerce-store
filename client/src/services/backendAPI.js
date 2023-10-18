import axios from "axios";

// axios.defaults.baseURL = "https://taskpro.onrender.com";

axios.defaults.baseURL = "http://localhost:3000";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

// --------------------------------------------ITEMS----------------------//

export const getAllItemsApi = async () => {
  //   token.set(userToken);
  const { data } = await axios.get("/items.json");
  return data;
};
