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

const TodayBooking = () => {
  const [keyword, setKeyword] = useState("")
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/todayBooking")
      .then((res) => res.json())
      .then((data) => setBooking(data.result));
  }, []);
  
  const filter = booking?.filter((item)=>item.phone === String(keyword));
  const total = booking?.reduce((n, {total}) => n + parseInt(total), 0)
  const advance = booking?.reduce((n, {advancedAmount}) => n + parseInt(advancedAmount), 0)
  const due = booking?.reduce((n, {due}) => n + parseInt(due), 0);
 

  return (
    <div className="px-10">
      <h1 className="text-center text-4xl font-bold text-black my-5 uppercase">
        ToDay All booking <span className="font-bold text-fuchsia-500"> Information !!</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 bg-blue-400 text-white text-center mx-10 mb-5 rounded shadow-xl">
        {/* Total Amount */}
        <div className="stat p-5">
          <div className=" text-black text-xl opacity-90 "> Total Amount :</div>
          <div className="text-xl mt-3">৳{total}</div>
        </div>
        {/* Advanced Amount */}
        <div className="stat">
          <div className="stat-title  text-black text-xl opacity-90">Total Advanced :</div>
          <div className="text-xl mt-3">৳{advance}</div>
        </div>
        {/* Total Due */}
        <div className="stat">
          <div className="stat-title  text-black text-xl opacity-90">otal Due Amount :</div>
          <div className="text-xl mt-3">৳{due}</div>
        </div>
      </div>
      {/* search */}
      <h2 className="text-center text-2xl font-bold my-5 text-balck">Search For User Phone Number !!</h2>
      <div className="lg:bg-transparent lg:py-0 lg:items-center lg:flex-row xl:px-6 space-y-2 lg:space-y-0 lg:space-x-3 m-auto my-10 text-center">
        <input
          type="text"
          placeholder="User Phone Number Search.."
          className=" text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400 w-72 sm:w-96 lg:w-60 xl:w-96 "
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto w-full">
        <Table dataSource={booking} pagination={false} columns={columns} />
      </div>
    </div>
  );
};

export default TodayBooking;
