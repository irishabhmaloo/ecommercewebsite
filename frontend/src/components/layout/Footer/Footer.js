import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">

            {/* left segment */}
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            {/* middle segment */}
            <div className="midFooter">
                <h1>ShauKing</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights 2023 &copy; RishabhRox</p>
            </div>

            {/* right segment */}
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/irishabhrox">Instagram</a>
                <a href="http://youtube.com/@RishabhRox">Youtube</a>
                <a href="http://facebook.com/iRishabhRox">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;