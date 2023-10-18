import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { getAllItemsApi } from "./services/backendAPI";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const newItems = await getAllItemsApi();
      if (newItems) {
        setItems((items) => [...items, ...newItems]);
      }
    })();
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsLoggedIn(true);
  //       const { uid } = user;
  //       setUid(uid);
  //     } else {
  //       setIsLoggedIn(false);
  //       setUid("");
  //     }
  //   });
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout isLoggedIn={isLoggedIn} />}>
        <Route index element={<HomePage items={items} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
