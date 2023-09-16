import './App.css';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import react from "react";
import WebFont from "webfontloader";
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from './components/User/LoginSignUp';
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  react.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element = {<Home />} />
        <Route exact path="/product/:id" element = {<ProductDetails />} />
        <Route exact path="/products" element = {<Products />} />
        <Route exact path="/products/:keyword" element = {<Products />} />
        <Route exact path="/search" element = {<Search />} />
        <Route exact path="/login" element = {<LoginSignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/account" element = {<Profile />} />
          <Route exact path="/me/update" element = {<UpdateProfile />} />
          <Route exact path="/password/update" element = {<UpdatePassword />} />
        </Route>
        <Route exact path="/password/forgot" element = {<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element = {<ResetPassword />} />
        <Route exact path="/cart" element = {<Cart />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
