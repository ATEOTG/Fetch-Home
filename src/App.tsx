import { Routes, Route, Navigate } from "react-router-dom";
import "./scss/main.scss";
import Login from "./components/Login";
import Home from "./components/Home";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate replace to="/user/login" />} />
        <Route path="/user/*" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Fragment>
  );
}

export default App;
