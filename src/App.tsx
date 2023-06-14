import { Routes, Route, Navigate } from "react-router-dom";
import "./scss/main.scss";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/user/login" />} />
        <Route path="/user/*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
