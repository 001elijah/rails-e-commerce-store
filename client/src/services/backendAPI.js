import axios from "axios";

// axios.defaults.baseURL = "https://taskpro.onrender.com";

axios.defaults.baseURL = "http://localhost:3000";

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = "";
//   },
// };

// --------------------------------------------ITEMS----------------------//

export const getAllItemsApi = async () => {
  //   token.set(userToken);
  const { data } = await axios.get("/items.json");
  return data;
};

export const addItemApi = async (itemData) => {
  //   token.set(userToken);
  const { data } = await axios.post("/items.json", itemData);
  return data;
};

export const editItemApi = async ({ id, name, description, price }) => {
  //   token.set(userToken);
  const { data } = await axios.patch(`/items/${id}.json`, {
    name,
    description,
    price,
  });
  return data;
};

export const destroyItemApi = async (id) => {
  //   token.set(userToken);
  await axios.delete(`/items/${id}.json`);
};

// --------------------------------------------ORDERS----------------------//

export const addOrderApi = async (orderData) => {
  //   token.set(userToken);
  const { data } = await axios.post("/orders.json", orderData);
  return data;
};

export const getAllOrdersApi = async () => {
  //   token.set(userToken);
  const { data } = await axios.get("/orders.json");
  return data;
};