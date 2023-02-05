import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import moment from "moment/moment";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Swal from "sweetalert2";

const BookingUpdate = () => {
  const [value, setvalue] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());

  const { id } = useParams();
  const [user, setUser] = useState(id);
  useEffect(() => {
    fetch(`http://localhost:5000/booking/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const handleMultiply = (event) => {
    setvalue(event);
  };

  const options = [
    { label: "Single Room", value: "Single Room" },
    { label: "Couple Room", value: "Couple Room" },
    { label: "Option 3", value: "Ac Room" },
    { label: "Option 4", value: "Ac Booking Room" },
  ];

  // Submit Btn
  const updateHandleSubmit = (event) => {
    event.preventDefault();

    const updateUser = {
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

    fetch(`http://localhost:5000/booking/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire(
            "Booking Update Successfully!!",
            "Thanks Your For Your Booking Update",
            "success"
          );
        } else {
          Swal.fire(
            "Booking Update Fail!!",
            "Please SomeThing Change And Try Again",
            "error"
          );
        }
        setUser(data);
      });

    event.target.reset();
  };
  return (
    <div>
      <h1 className="text-xl lg:text-4xl my-5 font-bold text-center text-black">
        Welcome to Hotel Rajasthan Update !!
      </h1>
      <div className="flex justify-between items-center px-5 relative">
        <div className="form-control w-full ">
          <form onSubmit={updateHandleSubmit}>
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
                    defaultValue={user.serialNumber}
                    disabled
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
                  defaultValue={user.phone}
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
                  defaultValue={user.gustName}
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
                  defaultValue={user.parentName}
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
                  defaultValue={user.emPhone}
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
                  defaultValue={user.totalGust}
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
                  defaultValue={user.address}
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
                  defaultValue={user.nidCard}
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
                  defaultValue={user.customerStatue}
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // onChange={handleUpdateCake}
                  // required
                >
                  <option className="text-lg text-black" value="" disabled>
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
                  defaultValue={user.nationality}
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  // onChange={handleUpdateCake}
                  // required
                >
                  <option className="text-lg text-black" value="" disabled>
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
                  {/* {name.map((nam) => (
                    <option key={nam.id} value={nam}>{nam}</option>
                  ))} */}
                  {/* <option disabled selected>Who shot first?</option> */}
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
                  <option className="text-lg text-black" value="" disabled>
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
            <div className="grid grid-cols-2 gap-5 mt-5 ">
              <div className="font-bold ">
                <span className="text-xl font-bold text-black w-1/2 ">
                  Your Requirement :
                </span>
                <textarea
                  className="textarea outline outline-1 rounded-md w-full max-w-full textarea-primary mt-3 focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  name="message"
                  defaultValue={user.message}
                  placeholder="Enter Your Requirement.."
                  rows={6}
                  cols={20}
                  // required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-5 flex-wrap">
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
                    style={{ width: "280px" }}
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
                    style={{ width: "280px" }}
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
                  defaultValue={user.collection}
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
              >
                Booking Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingUpdate;
