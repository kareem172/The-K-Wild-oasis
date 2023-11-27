import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from './styles/GlobalStyles'

function App() {
  return (
    <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="booking" element={<Bookings />} />
        <Route path="login" element={<Login />} />
        <Route path="sitting" element={<Settings />} />
        <Route path="user" element={<Users />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
