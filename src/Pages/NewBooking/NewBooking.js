import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import auth from "../../firebase.init";
import photo from "../../assets/lock.png"

const NewBooking = ({ serials, rooms }) => {
  const [users] = useAuthState(auth);
  const [option, setOption] = useState("");
  const handleChange = (e) => {
    setOption(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  let few = 0;
  if(serials){
    few  = Math.max(...serials?.map(n => n?.serialNumber))
  }
  const serialNumber = few ? parseInt(few) + 1 : 0 + 1;
  const data = rooms.find((item)=> item.room === Number(option.selectedRoom?.split("-")[0]) )
  const advance = option?.advancedAmount ? option?.advancedAmount : ""; 
  const total = data?.price ? data.price : "";
  const due = total - advance ? total - advance : "";
  const createdAt = new Date();
  const Booking = {...option, total, due, date: createdAt, serialNumber};
  const handleSubmit = () => {
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Booking),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <div>
      <h1 className="text-xl  lg:text-4xl my-5 font-bold text-center text-black">
        Welcome to <span className="text-fuchsia-500">Rajasthan</span> Hotel !!
      </h1>
      <div className="flex justify-between items-center px-5 relative">
        <div className="form-control w-full ">
          <form>
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
                    name="serial"
                    value={`Booking-${few + 1}`}
                    readOnly
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              <div>
                <label
                  htmlFor="selectRo"
                  className="block mb-2 font-bold text-black  "
                >
                  Selected Room
                </label>
                <select
                  id="selectRo"
                  name="selectedRoom"
                  onClick={handleChange}
                  className="w-full text-xs lg:text-sm outline outline-purple-500 outline-1 p-2 pl-3 rounded focus:ring-2 focus:ring-blue-500 focus:shadow-2xl  focus:font-bold focus:text-fuchsia-600 shadow-md focus:bg-neutral-400"
                  
                >
                  <option value="" className="text-lg text-black"> Select Your Room</option>
                  {
                    rooms?.map((item) => (
                      <option
                        key={item._id}
                        
                        value={`${item.room}-${item.type}`}
                        className="text-lg text-black"
                      >
                        {`${item.room}-${item.type}`}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="-mt-2">
                <label className="label">
                  <span className="font-bold text-black">Room Price :</span>
                </label>
                <input
                  name="roomPrice"
                  type="text"
                  value={total}
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
                  onChange={handleChange}
                  
                  // required
                >
                  <option className="text-lg text-black" value="" selected>
                    Selected Room Quantity
                  </option>
                  {
                    [...Array(5).keys()].map(number => <option
                      key={number}
                      className="text-lg text-black" value={number + 1}>
                        {number + 1}
                    </option>)
                  }
                  
                </select>
              </div>

              <div className="-mt-2">
                <label className="label">
                  <span className="font-bold text-black">Total Price :</span>
                </label>
                <input
                  name="totalPrice"
                  type="text"
                  value={total}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={due}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    name="checkin"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    name="checkout"
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
                onClick={handleSubmit}
              >
                Confirm Booking 
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="px-6">
            <h1 className="my-10  font-bold text-lg md:text-2xl lg:text-5xl text-center">
            Today's <span className="text-fuchsia-500">Available</span> Room
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {
                        rooms?.map((item) => (
                            <div key={item._id} className="card bg-base-100 shadow-xl image-full">
                                <figure>
                                    <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                                </figure>
                                <div className="card-body flex justify-center items-center">
                                    <p>{item.bookedDate === new Date().toISOString().slice(0, 10) ? item.bookedDate : ""}</p>
                                    <h2 className="card-title text-white m-0">{item.room}-{item.type} </h2>
                                    <img className="h-10 w-10" src={photo} alt="Avatar"/>
                                </div>
                            </div>
                        ))
                }
            </div>
      </div>
    </div>
  );
};

export default NewBooking;
