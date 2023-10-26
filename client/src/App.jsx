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
import {
  checkLoginStatusApi,
  getAllItemsApi,
  getAllOrdersApi,
  getAllUsersApi,
  getUserOrdersApi,
} from "./services/backendAPI";
import AllUsersPage from "./pages/AllUsersPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const throwSuccessPopup = (message) => toast.success(message);

  const throwInfoPopup = (message) => toast.info(message);

  const throwErrorPopup = (message) => toast.error(message);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem(currentUser?.id) || "");
      if (items) {
        setCart(items);
      } else {
        setCart([]);
      }
    } catch (error) {
      setCart([]);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (isLoggedIn) {
      try {
        localStorage.setItem(currentUser?.id, JSON.stringify(cart));
      } catch (error) {
        throwErrorPopup(error.message);
      }
    }
  }, [isLoggedIn, currentUser?.id, cart]);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      (async () => {
        try {
          const allUsers = await getAllUsersApi();
          setUsers((prevUsers) => [...prevUsers, ...allUsers]);
        } catch (error) {
          throwErrorPopup(error.message);
        }
      })();
    }
  }, [currentUser?.role]);

  useEffect(() => {
    (async () => {
      try {
        const response = await checkLoginStatusApi();
        response.user
          ? throwInfoPopup(`Welcome back, ${response.user.first_name}!`)
          : throwInfoPopup(`Please authenticate!`);
        if (response.logged_in && !isLoggedIn) {
          setIsLoggedIn(true);
          setCurrentUser(response.user);
        } else if (!response.logged_in && isLoggedIn) {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        throwErrorPopup(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const newItems = await getAllItemsApi();
        if (newItems) {
          setItems((items) => [...items, ...newItems]);
        }
      } catch (error) {
        throwErrorPopup(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const orders =
            currentUser?.role === "admin"
              ? await getAllOrdersApi()
              : await getUserOrdersApi(currentUser?.id);
          if (orders) {
            setOrders((prevOrders) => [...prevOrders, ...orders]);
          }
        } catch (error) {
          throwErrorPopup(error.message);
        }
      })();
    }
  }, [isLoggedIn, currentUser?.id, currentUser?.role]);

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((prevItem) => prevItem.id !== id));
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <SharedLayout
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setOrders={setOrders}
              setUsers={setUsers}
              throwSuccessPopup={throwSuccessPopup}
              throwErrorPopup={throwErrorPopup}
            />
          }
        >
          <Route
            index
            element={
              <HomePage
                currentUser={currentUser}
                items={items}
                onManageItems={setItems}
                cart={cart}
                setCart={setCart}
                throwSuccessPopup={throwSuccessPopup}
                throwErrorPopup={throwErrorPopup}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                currentUser={currentUser}
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                resetCart={resetCart}
                setOrders={setOrders}
                throwSuccessPopup={throwSuccessPopup}
                throwErrorPopup={throwErrorPopup}
              />
            }
          />
          <Route path="/orders" element={<OrdersPage orders={orders} throwErrorPopup={throwErrorPopup} />} />
          <Route
            path="/users"
            element={<AllUsersPage currentUser={currentUser} users={users} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
