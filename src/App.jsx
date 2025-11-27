import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Signup from "./features/signup/Signup.jsx";
import Login from "./features/Login.jsx";
import UserSignUp from "./features/signup/UserSignUp.jsx";
import ReactQueryProvider from "./lib/ReactQueryProvider.jsx";
//import { Form } from "react-hook-form";
import UserForm from "./features/signup/userForm.jsx";
import Form from "./features/signup/Form.jsx";
import Homepage from "./pages/Homepage/homepage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import ShippingForm from "./pages/Chekout/ShippingForm";
import Products from "./pages/Products/Products";
import { useUser } from "./contexts/AuthContext";
import Settings from "./pages/Setting/Settings";
import AddProduct from "./features/addproduct/AddProduct";
import Wishlist from "./pages/wishlist/Wishlist";
import { BuyNowProvider } from "@/contexts/BuyNowContext";
import Myproducts from "./pages/Myproducts/Myproducts";
import MyOrders from "./pages/MyOrders";
import { CartProvider } from "./contexts/useCart";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landingPage/LandingPage";
import AboutBeyaa from "./pages/landingPage/About";

import ScrollToTop from "./ScrollToTop";
import StoreAbout from "./pages/About";
import Banners from "./pages/Setting/banners";
import VerifyEmail from "./pages/verifyEmailPage";
import VerifyRequired from "./pages/VerifyRequired.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ReseTPassword.jsx";

export default function App() {
  function RequireAuth() {
    const { data: user } = useUser();
    console.log(user);
    if (user === undefined) return <p>You are not authenticated</p>; // or a spinner while loading
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return (
    <ReactQueryProvider>
      <BuyNowProvider>
        <CartProvider>
          <Toaster
            containerStyle={{
              top: 90,
              left: 20,
              bottom: 20,
              right: 20,
            }}
            position="top-center"
          />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/beyaa/about" element={<AboutBeyaa />} />
              <Route path="signup" element={<UserForm />} />
              <Route path="createStore" element={<Form />} />

              <Route path="/:slug" element={<Homepage />} />
              <Route
                path="/:slug/productPage/:productId"
                element={<ProductPage />}
              />
              <Route path="/:slug/cart" element={<CartPage />} />
              <Route path="/:slug/about" element={<StoreAbout />} />
              <Route path="/:slug/wishlist" element={<Wishlist />} />
              <Route path="/:slug/shippingForm" element={<ShippingForm />} />
              <Route path="/:slug/products" element={<Products />} />
              <Route element={<RequireAuth />}>
                <Route path="/:slug/settings" element={<Settings />}>
                  <Route path="banners" element={<Banners />} />
                </Route>

                <Route path="/:slug/addProducts" element={<AddProduct />} />
                <Route path="/:slug/myProducts" element={<Myproducts />} />
                <Route path="/:slug/myOrders" element={<MyOrders />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />

              <Route path="/verifyEmail" element={<VerifyEmail />} />
              <Route
                path="/:slug/verify-required"
                element={<VerifyRequired />}
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </BuyNowProvider>
    </ReactQueryProvider>
  );
}
