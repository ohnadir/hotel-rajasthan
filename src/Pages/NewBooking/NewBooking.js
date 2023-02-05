import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Swal from "sweetalert2";
import auth from "../../firebase.init";


// let totalDue = 0;

const NewBooking = ({ loadData }) => {
  const { name } = loadData;
  const [option, setOption] = useState()
  const [value, setvalue] = useState("");
  const [totalBooking, setTotalBooking] = useState({});
  const [users] = useAuthState(auth);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [count, setCount] = useState(
    parseInt(localStorage.getItem("count")) || 1
  );

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  const handleMultiply = (event) => {
    setvalue(event);
  };
  const handleChange = (e) => {
    setOption(prev=>({...prev, [e.target.name]:e.target.value}))
  }
  const options = [
    { label: "Single Room", value: "Single Room" },
    { label: "Couple Room", value: "Couple Room" },
    { label: "Option 3", value: "Ac Room" },
    { label: "Option 4", value: "Ac Booking Room" },
  ];
// Due Amount
// if (total < advanced) {
//   totalDue = 0;``
// } else if (total > advanced) {
//   totalDue = total - advanced;
// }
  // Submit Btn
  const handleSubmit = (event) => {
    event.preventDefault();
    // let status;
    // if (totalDue === 0) {
    //   status = "paid";
    // } else if (totalDue > 0) {
    //   status = "unpaid";
    // }

    const Booking = {
      serialNumber: event.target.serial.value,
      phone: event.target.phone.value,
      gustName: event.target.gust.value,
      parentName: event.target.parents.value,
      emPhone: event.target.ephone.value,
      totalGust: event.target.totalGust.value,
      address: event.target.address.value,
      nidCard: event.target.nidCard.value,
      customerStatue: event.target.cusStatue.value,
      nationality: event.target.national.value,
      multiply: value,
      seletedRoom: event.target.seletedRoom.value,
      roomPrice: event.target.roomPrice.value,
      roomQuantity: event.target.roomQuantity.value,
      totalPrice: event.target.totalPrice.value,
      advancedAmount: event.target.advancedAmount.value,
      dueAmount: event.target.dueAmount.value,
      logInDate: event.target.logindate.value,
      logOutDate: event.target.logoutdate.value,
      collection: event.target.collectionName.value,
      message: event.target.message.value,
    };
    console.log(Booking);
    console.log(users);

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Booking),
    })
      .then((res) => res.json())
      .then((data) => setTotalBooking(data));
    Swal.fire(
      "Booking Successfully!!",
      "Thanks Your For Your Booking Information",
      "success"
    );
    event.target.reset();
  };
  return (
    <div>
      <h1 className="text-xl lg:text-4xl my-5 font-bold text-center text-black">
        Welcome to <span className="text-fuchsia-500">Rajasthan</span> Hotel !!
      </h1>
      <div className="flex justify-between items-center px-5 relative">
        <div className="form-control w-full ">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mx-5 mb-5 items-center">
              <div>
                <h4 className="font-bold text-black">Today Date And Time</h4>
                <span className="text-purple-500 font-bold">
                  {moment().format("LL")}
                </span>{" "}
                <br />
                <span className="text-purple-500 font-bold">
                  {moment().format("LT")}
                </span>
              </div>
              <div>
                <div>
                  <label className="label">
                    <span className="text-black font-bold">
                      Serial Number :
                    </span>
                  </label>
                  <input
                    type="text"
                    value={`Booking-${count}`}
                    name="serial"
                    placeholder="Serial Number"
                    className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-xs md:text-sm lg:text-lg ">
              <div className="w-full">
                <label className="label">
                  <span className="text-black font-bold">Mobile :</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Your Phone Number.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md"
                  // required
                />
              </div>
              <div className="w-full">
                <label className="label">
                  <span className="text-black font-bold">Gust Name :</span>
                </label>
                <input
                  type="text"
                  name="gust"
                  placeholder="Enter Your Gust Name.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md"
                  // required
                />
              </div>
              <div className="w-full">
                <label className="label">
                  <span className="text-black font-bold">Parents Name :</span>
                </label>
                <input
                  type="text"
                  name="parents"
                  placeholder="Enter Your Parents Name.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md"
                  // required
                />
              </div>
              <div className="w-full">
                <label className="label">
                  <span className="text-black font-bold phone1">
                    Emergency Contact :
                  </span>
                </label>
                <input
                  type="text"
                  name="ephone"
                  placeholder="Enter Your Emergency Contact.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md"
                  // required
                />
              </div>
              <div className="w-full -mt-2">
                <label className="label">
                  <span className="text-black font-bold">Total Gust :</span>
                </label>
                <input
                  type="text"
                  name="totalGust"
                  placeholder="Enter Total Gust.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md"
                  // required
                />
              </div>
              <div className="w-full -mt-2">
                <label htmlFor="yourAddress" className="label">
                  <span className="text-black font-bold">NID/Address :</span>
                </label>
                <input
                  type="text"
                  id="yourAddress"
                  name="address"
                  placeholder="Enter Your Address.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md"
                  // required
                />
              </div>
              <div className="w-full -mt-2">
                <label className="label">
                  <span className="text-black font-bold">
                    NID Card/PassPort :
                  </span>
                </label>
                <input
                  type="text"
                  name="nidCard"
                  placeholder="Enter Your NID/PassPort Card.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md"
                  // required
                />
              </div>
              <div>
                <label
                  htmlFor="customerStatue"
                  className="block mb-2 font-bold text-black  "
                >
                  Customer Statue
                </label>
                <select
                  id="customerStatue"
                  name="cusStatue"
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // onChange={handleUpdateCake}
                  // required
                >
                  <option className="text-lg text-black" value="" selected>
                    Selected Customer Statue
                  </option>
                  <option className="text-lg text-black" value="Corporate">
                    Corporate
                  </option>
                  <option className="text-lg text-black" value="Non-Corporate">
                    Non-Corporate
                  </option>
                  <option className="text-lg text-black" value="Business">
                    Business
                  </option>
                  <option className="text-lg text-black" value="Govt.Job">
                    Govt.Job
                  </option>
                  <option className="text-lg text-black" value="Student">
                    Student
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="NationalityStatue"
                  className="block mb-2 font-bold text-black  "
                >
                  Nationality
                </label>
                <select
                  id="NationalityStatue"
                  name="national"
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // onChange={handleUpdateCake}
                  // required
                >
                  <option className="text-lg text-black" value="" selected>
                    Selected Nationality
                  </option>
                  <option className="text-lg text-black" value="Bangladesh">
                    Bangladesh
                  </option>
                  <option className="text-lg text-black" value="India">
                    India
                  </option>
                  <option className="text-lg text-black" value="Mayermer">
                    Mayermer
                  </option>
                  <option className="text-lg text-black" value="Pakhistan">
                    Pakhistan
                  </option>
                  <option className="text-lg text-black" value="Other">
                    Other
                  </option>
                </select>
              </div>
              <div className="-mt-2">
                <label className="label">
                  <span className="text-black font-bold">MultiplyRoom :</span>
                </label>
                <MultiSelect onChange={handleMultiply} options={options} />
              </div>
              <div>
                <label
                  htmlFor="selectRo"
                  className="block mb-2 font-bold text-black  "
                >
                  Seleted Room
                </label>
                <select
                  id="selectRo"
                  name="seletedRoom"
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // onChange={handleUpdateCake}
                  // required
                >
                  {name.map((nam) => (
                    <option
                      key={nam.id}
                      value={nam}
                      className="text-lg text-black"
                    >
                      {nam}
                    </option>
                  ))}
                </select>
              </div>
              <div className="-mt-2">
                <label className="label">
                  <span className="font-bold text-black">Room Price :</span>
                </label>
                <input
                  name="roomPrice"
                  type="text"
                  placeholder="Enter Room Price.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // required
                />
              </div>
              <div className="-mt-2">
                <label htmlFor="roomQuant" className="label">
                  <span className="font-bold text-black  ">
                    Room Quantity :
                  </span>
                </label>
                <select
                  id="roomQuant"
                  name="roomQuantity"
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // onChange={handleUpdateCake}
                  // required
                >
                  <option className="text-lg text-black" value="" selected>
                    Selected Room Quantity
                  </option>
                  <option className="text-lg text-black" value="1">
                    1
                  </option>
                  <option className="text-lg text-black" value="2">
                    2
                  </option>
                  <option className="text-lg text-black" value="3">
                    3
                  </option>
                  <option className="text-lg text-black" value="4">
                    4
                  </option>
                  <option className="text-lg text-black" value="5">
                    5
                  </option>
                </select>
              </div>

              <div className="-mt-2">
                <label className="label">
                  <span className="font-bold text-black">Total Price :</span>
                </label>
                <input
                  name="totalPrice"
                  type="text"
                  placeholder="Total Room Price.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // required
                />
              </div>
              <div className="-mt-2">
                <label className="label">
                  <span className="font-bold text-black">
                    Advanced Amount :
                  </span>
                </label>
                <input
                  name="advancedAmount"
                  type="text"
                  placeholder="Enter Room Price.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // required
                />
              </div>
              <div className="-mt-2">
                <label className="label">
                  <span className="font-bold text-black">Due Amount :</span>
                </label>
                <input
                  name="dueAmount"
                  type="text"
                  placeholder="Enter Room Price.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // required
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2  gap-5 mt-5">
              <div className="font-bold ">
                <span className="text-xl font-bold text-black w-1/2 ">
                  Your Requirement :
                </span>
                <textarea
                  className="rounded-md  max-w-full  mt-3 
                  w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3  focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  name="message"
                  placeholder="Enter Your Requirement.."
                  rows={6}
                  cols={20}
                  // required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-5 lg:flex-row-reverse">
                <div className="w-full">
                  <label className="label">
                    <span className="text-xl font-bold text-black  ">
                      Advanced Amount :
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Advanced Amount.."
                    className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="text-xl font-bold text-black  ">
                      Advanced Amount :
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Advanced Amount.."
                    className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  />
                </div>
                <div className="-mt-3">
                  <label htmlFor="loginDate" className="label">
                    <span className="text-xl font-bold text-black  ">
                      Booking Date :
                    </span>
                  </label>
                  <input
                    // style={{ width: "280px" }}
                    type="date"
                    name="logindate"
                    onChange={(e) => setBookingDate(e.target.value)}
                    id="logInDate"
                    className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  />
                </div>

                <div className="-mt-3">
                  <label htmlFor="logOutDate" className="label">
                    <span className="text-xl font-bold text-black  ">
                      CheckOut Date :
                    </span>
                  </label>
                  <input
                    // style={{ width: "280px" }}
                    type="date"
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    name="logoutdate"
                    id="logOutDate"
                    className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-end mr-3">
              <div>
                <label className="label mt-3 ">
                  <span className="text-xl font-bold text-black  ">
                    Manager Signecher:
                  </span>
                </label>
                <input
                  style={{ width: "280px" }}
                  type="text"
                  name="collectionName"
                  placeholder="Enter Manager.."
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400 "
                  // required
                />
              </div>
            </div>

            <div className="card-actions justify-end ">
              <button
                className="btn mt-10 w-full max-w-xs hover:text-black bg-gradient-to-r from-fuchsia-500 via-purple-800 to-pink-500 text-white"
                type="submit"
                value="submit"
                onClick={() => setCount(count + 1)}
              >
                Booking Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1 className="my-10 font-bold text-5xl text-center">
          Today's <span className="text-fuchsia-500">Avaiable</span> Room
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {name.map((nam) => (
            // <option >{nam}</option>
            <div key={nam.id} className="card bg-base-100 shadow-xl image-full">
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white">{nam}</h2>
                {/* <p className="text-white">
                  Room Avaabile Now Choice Your Best Room
                </p> */}
                <div>
                  <img
                    className="h-10 w-10"
                    src="../../assets/img.jpg"
                    alt="Avator"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
