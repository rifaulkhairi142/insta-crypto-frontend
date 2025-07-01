import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home.jsx";
import Home from "./pages/Customer/Home.jsx";
import Login from "./pages/Customer/Login.jsx";
import Register from "./pages/Customer/Register.jsx";
import TransactionHistoryPage from "./pages/Customer/TransactionHistoryPage.jsx";

import axios from "axios";
// import Login from "./pages/Login.jsx";
// import Register from './pages/Register.jsx';
import { Provider } from "react-redux";
import { store } from "./app/store";
import Pembayaran from "./pages/Pembayaran.jsx";
import ProfilePage from "./pages/Customer/ProfilePage.jsx";
import AppWrapper from "./component/AuthWrapper.jsx";
import PaymentDetailPage from "./pages/Customer/PaymentDetailPage.jsx";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      { path: "", element: <Home /> },
      { path: "/transaction-history", element: <TransactionHistoryPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/payment-detail/:id", element: <PaymentDetailPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
