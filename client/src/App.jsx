import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { getAllItemsApi, getAllOrdersApi } from "./services/backendAPI";
import AllUsersPage from "./pages/AllUsersPage";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const newItems = await getAllItemsApi();
      if (newItems) {
        setItems((items) => [...items, ...newItems]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const orders = await getAllOrdersApi();
      if (orders) {
        setOrders((prevOrders) => [...prevOrders, ...orders])
      }
    })()
  }, [])
  

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => 
      prevCart.filter(prevItem => prevItem.id !== id )
    )
  }

  const resetCart = () => {
    setCart([]);
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout isLoggedIn={true} />}>
        <Route
          index
          element={
            <HomePage
              items={items}
              onManageItems={setItems}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route path="/cart" element={<CartPage cart={cart} handleRemoveFromCart={handleRemoveFromCart} resetCart={resetCart}/>} />
        <Route path="/orders" element={<OrdersPage orders={orders} />} />
        <Route path="/users" element={<AllUsersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
