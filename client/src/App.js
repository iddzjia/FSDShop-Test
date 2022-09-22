import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/page/Home";
import Login from "./components/page/Login";
import Registration from "./components/page/Registration";
import Product from "./components/page/Product";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
        <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/product/:id" exact element={<Product />} />
          <Route path="/product/name/:name" exact element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
