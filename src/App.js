import { Route, Routes } from "react-router-dom";
import "./App.css";

import BookingDashboard from "./Pages/BookingDashboard/BookingDashboard";
import BookingUpdate from "./Pages/BookingUpdate/BookingUpdate";
import KichenOrder from "./Pages/KichenOrder/KichenOrder";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Pages/Login/RequireAuth";
import Header from './Pages/Navbar/Header';
import BookingData from "./Pages/NewBooking/BookingData";
import NotFound from "./Pages/NotFound/NotFound";
import Footer from "./Pages/Share/Footer/Footer";
import Unpaid from "./Pages/Status/Unpaid/Unpaid";
import TodayBooking from "./Pages/TodayBooking/TodayBooking";

function App() {
  
  return (
    <div className="max-w-7xl mx-auto">
      <Header/>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <BookingData/>
             </RequireAuth>
          }
        ></Route>
        <Route
          path="unpaid"
          element={
            <RequireAuth>
              <Unpaid />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="todayBooking"
          element={
            <RequireAuth>
              <TodayBooking />
             </RequireAuth>
          }
        ></Route>
        <Route
          path="kichenOrder"
          element={
            <RequireAuth>
              <KichenOrder />
             </RequireAuth>
          }
        ></Route>
        <Route
          path="bookingDashboard"
          element={
            <RequireAuth>
              <BookingDashboard />
             </RequireAuth>
          }
        ></Route>
        <Route path="bookingUpdate/:id" element={<BookingUpdate/>}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;
