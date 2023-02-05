import React, { useEffect, useState } from "react";
import NewOrder from "./NewBooking";

const Today = () => {
    const [dataLoad,setDataLoad] = useState([]);

    useEffect( ()=>{
        fetch("check.json")
        .then((res) => res.json())
        .then(data =>setDataLoad(data))
    })
  return (
    <div>
      {
        dataLoad.map(loadData=><NewOrder key={loadData.id}
        loadData={loadData}
        ></NewOrder>)
      }
    </div>
  )
}

export default Today;

