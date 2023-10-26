import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://rails-e-ecommerce-store.onrender.com";

// --------------------------------------------AUTH----------------------//

export const registerUserApi = async (userData) => {
  const { data } = await axios.post("/registrations", userData, {
    withCredentials: true,
  });
  return data;
};

export const loginUserApi = async (userData) => {
  const { data } = await axios.post("/sessions", userData, {
    withCredentials: true,
  });
  return data;
};

export const logoutUserApi = async () => {
  const { data } = await axios.delete("/logout", { withCredentials: true });
  return data;
};

export const checkLoginStatusApi = async () => {
  const { data } = await axios.get("/logged_in", { withCredentials: true });
  return data;
};

// --------------------------------------------ITEMS----------------------//

export const getAllItemsApi = async () => {
  const { data } = await axios.get("/items.json", { withCredentials: true });
  return data;
};

export const addItemApi = async (itemData) => {
  const { data } = await axios.post("/items.json", itemData, {
    withCredentials: true,
  });
  return data;
};

export const editItemApi = async ({ id, name, description, price }) => {
  const { data } = await axios.patch(
    `/items/${id}.json`,
    {
      name,
      description,
      price,
    },
    { withCredentials: true },
  );
  return data;
};

export const destroyItemApi = async (id) => {
  await axios.delete(`/items/${id}.json`, { withCredentials: true });
};

// --------------------------------------------ORDERS----------------------//

export const addOrderApi = async (orderData) => {
  const { data } = await axios.post("/react_orders", orderData, {
    withCredentials: true,
  });
  const orderItems = { items: orderData.items.map(item => { return {
      react_order_id: data.order.id,
      item_id: item.id,
      quantity: item.quantity,
    };
  })}
  await addOrderItems(orderItems);
  return data;
};

export const getUserOrdersApi = async (userId) => {
  const { data } = await axios.get("/react_orders.json", { withCredentials: true });
  const filteredData = data.orders.filter((order) => order.react_user_id === userId);
  return filteredData;
};

export const getAllOrdersApi = async () => {
  const { data } = await axios.get("/react_orders.json", {
    withCredentials: true,
  });
  return data.orders;
};

// --------------------------------------------ORDER_ITEMS----------------------//
const addOrderItems = async (orderItems) => {
  await axios.post("/react_order_items", orderItems, {
    withCredentials: true,
  });
}

export const getOrderItems = async (orderId) => {
  const { data } = await axios.get(`/react_order_items/${orderId}`, {
    withCredentials: true,
  });
  return data;
}

// --------------------------------------------USERS----------------------//

export const getAllUsersApi = async () => {
  const { data } = await axios.get("/react_users.json", {
    withCredentials: true,
  });
  return data;
};
