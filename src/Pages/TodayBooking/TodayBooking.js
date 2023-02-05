import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TodayBooking = () => {
  const [booking, setBooking] = useState([]);
  //search
  const [search, setSearch] = useState("");
  const [todaysTotal, setTodaysTotal] = useState({});
  const [advancedAmount, setAdvancedAmount] = useState({});
  // unpaid & paid
  const [getUnpaidBooking, setUnpaidBooking] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getTodaysTotalAmount")
      .then((res) => res.json())
      .then((data) => setTodaysTotal(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/getTodaysAdvancedAmount")
      .then((res) => res.json())
      .then((data) => setAdvancedAmount(data));
  }, []);
  // paid & unpaid
  useEffect(() => {
    const url = `http://localhost:5000/getUnpaidBooking`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUnpaidBooking(data));
  }, []);
  //search
  const getData = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/getTodaysBooking"
      );
      const data = await res.json();
      setBooking(data);
    } catch (error) {
      console.log(error);
    }
  };
  const filtered = booking.filter(
    (user) =>
      user.phone.includes(search) ||
      user.emPhone.includes(search)
  );

  useEffect(() => {
    getData();
  }, []);

  const handleClickPaid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your booking Pay Now !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Pay Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/handlePaidBooking/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => {
            res.json();
          })
          .then((data) => {
            console.log(data);
          });
        Swal.fire("Success!", "Your booking pay Now !!", "success");
      }
      // window.location.reload();
    });
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-black my-5 uppercase">
        ToDay All booking 
        <span className="font-bold text-fuchsia-500"> Information !!</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-blue-400 text-white text-center mx-10 mb-5 rounded shadow-xl">
        {/* Total Amount */}
        <div className="stat p-5">
          <div className="stat-title font-extrabold text-black text-xl opacity-90 ">
            Total Amount :
          </div>
          <div className="stat-value mt-3">
            {todaysTotal ? `৳${todaysTotal?.sum}` : null}
          </div>
        </div>
        {/* Advanced Amount */}
        <div className="stat">
          <div className="stat-title font-extrabold text-black text-xl opacity-90">
           Total Advanced :
          </div>
          <div className="stat-value mt-3">
            {advancedAmount ? `৳${advancedAmount?.sum}` : null}
          </div>
        </div>
        {/* Total Due */}
        <div className="stat">
          <div className="stat-title font-extrabold text-black text-xl opacity-90">
           Total Due Amount :
          </div>
          <div className="stat-value mt-3">
            {advancedAmount?.sum > 0 ? (
              <React.Fragment>
                {todaysTotal && advancedAmount
                  ? `৳${todaysTotal?.sum - advancedAmount?.sum}`
                  : "৳ 0"}
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
      {/* search */}
      <h2 className="text-center text-2xl font-bold my-5 text-balck">
      Search For User Phone Number !!
      </h2>
      <div className="lg:bg-transparent lg:py-0 lg:items-center lg:flex-row xl:px-6 space-y-2 lg:space-y-0 lg:space-x-3 m-auto my-10 text-center">
        <input
          type="text"
          placeholder="User Phone Number Search.."
          className=" text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400 w-72 sm:w-96 lg:w-60 xl:w-96 "
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
              <th>bookingID</th>
              <th>Address/customerStatue</th>
              <th>Price/Quantity</th>
              <th>TPrice/APrice</th>
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
                      <div className="font-bold">{user.phone}</div>
                      <div className="text-sm opacity-50">{user.gustName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.parentName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.emPhone}
                  </span>
                </td>
                <td>
                  {user.seletedRoom}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.roomQuantity}
                  </span>
                </td>
                <td>
                  {user.nidCard}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.nationality}
                  </span>
                </td>
                <td>{user.serialNumber}</td>
                <td>
                  {user.address}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.customerStatue}
                  </span>
                </td>
                <td>
                  {user.roomPrice}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.roomQuantity}
                  </span>
                </td>
                <td>
                  {user.totalPrice}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.advancedAmount}
                  </span>
                </td>
                <td>{user.collection}</td>
                <td>
                  <>
                    <span
                      className={
                        user?.status === "unpaid"
                          ? "bg-yellow-300 rounded-full px-3 py-1 text-yellow-500 bg-opacity-40"
                          : "bg-green-300 rounded-full px-3 py-1 text-green-500 bg-opacity-40"
                      }
                    >
                      {user?.status}
                    </span>
                    {user?.status !== "paid" ? (
                      <button
                        className="btnn ml-3 text-white "
                        onClick={() => handleClickPaid(user?._id)}
                      >
                        Paid Now
                      </button>
                    ) : null}
                  </>
                </td>
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
                      bbookingRadius: "5px",
                      padding: "2px",
                    }}
                    readOnly
                  ></textarea>
                </td>
              </tr>
              <tr>
                <div></div>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TodayBooking;
