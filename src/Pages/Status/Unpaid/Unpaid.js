import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Unpaid = () => {
  const [getUnpaidBooking, setUnpaidBooking] = useState([]);
  const [search, setSearch] = useState("");

  //data load
  const getData = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/getUnpaidBooking"
      );
      const data = await res.json();
      setUnpaidBooking(data);
    } catch (error) {
      console.log(error);
    }
  };
  const filtered = getUnpaidBooking.filter((user) =>
  user.phone.includes(search) ||
  user.emPhone.includes(search));

  
  useEffect(() => {
    getData();
  }, []);

  const handleClickPaid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your Due Amount Paid Now !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Paid it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/handlePaidBooking/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.acknowledged) {
              Swal.fire(
                "SuccessFully!",
                "Your Order SuccessFull Paid Now !!",
                "success"
              );
            } else {
              Swal.fire("Oops...", "Something went wrong!!", "error");
            }
            const remaining = filtered.filter((usr) => usr._id !== id);
            setUnpaidBooking(remaining);
          });
      }
    });
  };

  return (
    <>
      <div>
        <h1 className="text-center text-3xl text-black my-5 font-bold uppercase">
          Total Hotel Rajasthan Booking <br />
          <div>
            <span className="text-purple-500 text-xl">Paid</span> &{" "}
            <span className="text-purple-500 text-xl">UnPaid </span>
            <span> Seleted !</span>
          </div>
        </h1>
        <h2 className="text-center text-xl text-purple-500 mb-5">
          User Phone Number Search
        </h2>
        <div
          className="lg:bg-transparent  lg:py-0  lg:items-center lg:flex-row  xl:px-6 space-y-2 
                    lg:space-y-0 lg:space-x-3 m-auto my-10 text-center"
        >
          <input
            type="text"
            placeholder="User Phone Number.."
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
                        <div className="text-sm opacity-50">
                          {user.gustName}
                        </div>
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
                            className="btn btn-primary btn-xs ml-3 text-white "
                            onClick={() => handleClickPaid(user?._id)}
                          >
                            Paid Now
                          </button>
                        ) : null}
                      </>
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
      </div>
    </>
  );
};

export default Unpaid;
