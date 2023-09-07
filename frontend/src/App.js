import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import react from "react";
import WebFont from "webfontloader";
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function App() {
  react.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
  });

  return (
    <Router>
      <Header />

      <Footer />
    </Router>
  );
}

export default App;
