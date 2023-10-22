export const SIDEBAR_DATA_LOGGED_IN = [
  {
    title: "Home",
    path: "/",
    access: "all",
  },
  {
    title: "Cart",
    path: "/cart",
    access: "user",
  },
  {
    title: "Orders history",
    path: "/orders",
    access: "all",
  },
  {
    title: "All users",
    path: "/users",
    access: "admin",
  },
  {
    title: "My profile",
    path: "/users",
    access: "user",
  },
  {
    title: "About",
    path: "/about",
    access: "all",
  },
];

export const SIDEBAR_DATA_LOGGED_OUT = [
  {
    title: "Home",
    path: "/",
    access: "all",
  },
  {
    title: "About",
    path: "/about",
    access: "all",
  },
];

export const KEY_NAME_ESC = "Escape";
export const KEY_EVENT_TYPE = "keyup";
