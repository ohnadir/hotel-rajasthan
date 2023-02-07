import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../firebase.init";
import "./BookingDasboard.css";


const BookingDashboard = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [search, setSearch] = useState([]);
  const [users] = useAuthState(auth);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  useEffect(() => {
    fetch("http://localhost:5000/bookingCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 5);
        setPageCount(pages);
      });
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/booking?page=${page}&size=${size}`
      );
      const data = await res.json();
      setTotalBooking(data);
    } catch (error) {
      console.log(error);
    }
  };
  const filtered = totalBooking.filter(
    (user) => user.phone.includes(search) || user.emPhone.includes(search)
  );

  useEffect(() => {
    fetch(`http://localhost:5000/booking?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalBooking(data)
      });
    getData();
  }, [page, size]);

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your Booking Confirm Delete Now !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/booking/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => {
            res.json();
          })
          .then((data) => {
            console.log(data);
            const remaining = filtered.filter((usr) => usr._id !== user._id);
            setTotalBooking(remaining);
          });
        Swal.fire("Deleted!", "Your Booking has been deleted !!", "success");
        console.log("deleteing from id", user);
      }
    });

    
  };
  return (
    <div>
      <h1 className="text-center text-4xl text-black my-5 font-bold uppercase">
        Welcome to Hotel <span className="text-fuchsia-500">Rajasthan</span>
      </h1>
      <h2 className="text-center text-xl font-bold">Search For Phone Number</h2>
      <div className="lg:bg-transparent lg:py-0 lg:items-center lg:flex-row xl:px-6 space-y-2 lg:space-y-0 lg:space-x-3 m-auto my-10 text-center">
        <input
          type="text"
          placeholder="User Phone Number Search.."
          className="text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400 w-72 sm:w-96 lg:w-60 xl:w-96 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Phone/Name</th>
              <th>PaName/EmPhone</th>
              <th>Room/Quantity</th>
              <th>NID/Nationality</th>
              <th>OrderID</th>
              <th>Address/customerStatue</th>
              <th>Price/Quantity</th>
              <th>TPrice/APrice</th>
              <th>LogInDate/LogOutDate</th>
              <th>Collection</th>
              <th>Message</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          {filtered.map((user, index) => (
            <tbody>
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{user?.phone}</div>
                      <div className="text-sm opacity-50">{user?.gustName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.parentName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.emPhone}
                  </span>
                </td>
                <td>
                  {user?.seletedRoom}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.roomQuantity}
                  </span>
                </td>
                <td>
                  {user?.nidCard}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.nationality}
                  </span>
                </td>
                <td>{user?.serialNumber}</td>
                <td>
                  {user?.address}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.customerStatue}
                  </span>
                </td>
                <td>
                  {user?.roomPrice}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.roomQuantity}
                  </span>
                </td>
                <td>
                  {user?.totalPrice}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.advancedAmount}
                  </span>
                </td>
                <td>
                  {user?.logInDate}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.logOutDate}
                  </span>
                </td>
                <td>{user?.collection}</td>
                <td>
                  <textarea
                    cols={30}
                    rows={2}
                    defaultValue={user?.message}
                    style={{
                      width: "200px",
                      fontSize: "13px",
                      background: "none",
                      color: "black",
                      borderRadius: "5px",
                      padding: "2px",
                    }}
                    readOnly
                  ></textarea>
                </td>
                <th>
                  <td>
                    <Link to={`/bookingUpdate/${user._id}`}>
                      {" "}
                      <button className="px-5 py-2 rounded bg-blue-500 text-white font-bold hover:text-white-500 hover:bg-blue-700">
                        Edit
                      </button>
                    </Link>
                  </td>
                </th>
                <th>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="px-5 py-2 rounded bg-red-500 text-white font-bold hover:text-white-500 hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </th>
              </tr>
              <tr>
                <div></div>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="flex justify-center items-center my-5 pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            // className="btn ml-5 pagination"
            className={page == number && "selected"}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select
          className="seletedBtn"
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="5" selected>
            5
          </option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};

export default BookingDashboard;
