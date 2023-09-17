import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import SearchIconLogo from "@mui/icons-material/Search";
import CartIconLogo from "@mui/icons-material/ShoppingCart";
import ProfileIconLogo from "@mui/icons-material/Man";

const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35, 0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIcon: true,
    searchIcon: true,
    cartIcon: true,
    profileIconUrl: "/login",
    searchIconUrl: "/search",
    cartIconUrl: "/cart",
    SearchIconElement: SearchIconLogo,
    CartIconElement: CartIconLogo,
    ProfileIconElement: ProfileIconLogo,
    profileIconColor: "rgba(35, 35, 35, 0.8)",
    searchIconColor: "rgba(35, 35, 35, 0.8)",
    cartIconColor: "rgba(35, 35, 35, 0.8)",
    profileIconColorHover: "rgba(35, 35, 35, 0.8)",
    searchIconColorHover: "rgba(35, 35, 35, 0.8)",
    cartIconColorHover: "rgba(35, 35, 35, 0.8)",
    searchIconSize: "2vmax",
    profileIconSize: "2vmax",
    cartIconSize: "2vmax",
    cartIconMargin: "1vmax",
  };
  
  const Header = () => {
    return <ReactNavbar 
        {...options} 
    />;
  };

export default Header
