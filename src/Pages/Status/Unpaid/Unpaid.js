import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Table } from 'antd';


const columns = [
  {
    title: 'Gust',
    dataIndex: 'gust',
    key: 'gust',
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Nationality',
    dataIndex: 'national',
    key: 'national',
  },
  {
    title: 'SelectedRoom',
    dataIndex: 'selectedRoom',
    key: 'selectedRoom',
  },
  {
    title: 'Check in',
    dataIndex: 'checkin',
    key: 'checkin',
  },
  {
    title: 'Advanced',
    dataIndex: 'advancedAmount',
    key: 'advancedAmount',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Due',
    dataIndex: 'due',
    key: 'due',
  },
];
const Unpaid = () => {
  const [search, setSearch] = useState("");
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/due")
      .then((res) => res.json())
      .then((data) => setBooking(data.result));
  }, []);
  const filter = booking?.filter((item)=>item.phone === String(search));
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
          <Table dataSource={booking} pagination={false} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Unpaid;
