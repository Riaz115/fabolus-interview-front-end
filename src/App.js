import logo from "./logo.svg";
import "./App.css";
import UserProfile from "./UserProfile/UserProfile";
import Header from "./Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfileTable from "./UserProfile/UserProfileTable";
import ForEditUser from "./ForEditUser/ForEditUser";
import ForDelete from "./ForDelete/ForDelete";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UserProfileTable />} />
        <Route path="/profile-user-form" element={<UserProfile />} />
        <Route path="/user/:id/edit" element={<ForEditUser />} />
        <Route path="/user/:id/delete" element={<ForDelete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
