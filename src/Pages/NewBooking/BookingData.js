import React, { useEffect, useState } from "react";
import NewOrder from "./NewBooking";

const Today = () => {
    const [dataLoad,setDataLoad] = useState([]);
    const [rooms, setRooms] = useState([]);
  const [serials, setSerial] = useState('')
  
    useEffect( ()=>{
        fetch("http://localhost:5000/rooms")
        .then((res) => res.json())
        .then(data => 
            setRooms(data.result)
        )
    },[]);
    useEffect(() => {
      fetch("http://localhost:5000/allBooking")
        .then((res) => res.json())
        .then((data) => setSerial(data.result));
    }, []);

    useEffect( ()=>{
        fetch("check.json")
        .then((res) => res.json())
        .then(data =>setDataLoad(data))
    },[]);
  return (
    <div>
      <NewOrder rooms={rooms} serials={ serials}></NewOrder>
    </div>
  )
}

export default Today;

