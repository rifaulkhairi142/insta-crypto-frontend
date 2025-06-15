import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import axios from "axios";
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx';
import { Provider } from "react-redux";
import {store} from './app/store';
import RiwayatTransaksi from "./pages/RiwayatTransaksi.jsx";
import Pembayaran from './pages/Pembayaran.jsx';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/bayar", element: <Pembayaran /> },
  { path: "/transactions", element: <RiwayatTransaksi /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
