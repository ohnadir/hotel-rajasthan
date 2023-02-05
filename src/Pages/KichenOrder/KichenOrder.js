import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const KichenOrder = () => {
  const [kichen, setKichen] = useState([]);
  const [search, setSearch] = useState("");
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch("https://oasis-cake.herokuapp.com/Ordercake");
      const data = await res.json();
      setKichen(data);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = kichen.filter(
    (a) =>
      a.orderId.toLowerCase().includes(search.toLowerCase()) ||
      a.date.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl py-5 text-orange-500">
        আজকের মোট কিচেন অর্ডারের অল ইনফরমেশন !!
      </h1>
      <h2 className="text-center text-xl text-purple-500">
        আজকের মোট কিচেন অর্ডার দেখতে আগামী কালকের তারিখ দিয়ে অনুসন্ধান করুন !!
      </h2>

      <div
        className="lg:bg-transparent  lg:py-0  lg:items-center lg:flex-row  xl:px-6 space-y-2 
                    lg:space-y-0 lg:space-x-3 m-auto my-10 text-center"
      >
        <input
          type="text"
          placeholder="উদাহরণ : বছর-মাস-তারিখ.."
          className="outline outline-1 outline-fuchsia-500 py-1 px-5 w-72 sm:w-96 lg:w-60 xl:w-96 rounded-xl focus:ring-2 focus:ring-fuchsia-500 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto mb-3">
        <table className="table table-zebra w-full">
          <thead className="text-black">
            <tr>
              <th>Serial</th>
              <th>Cake Name</th>
              <th>Order Id</th>
              <th>Delivery Date</th>
              <th>Cake Pound</th>
              <th>Collection</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
          {
                filtered.map((a, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className="text-orange-500">{a?.cakeName}</td>
                    <td>{a?.orderId}</td>
                    <td>{a?.date}</td>
                    <td>{a?.cakePound}</td>
                    <td className="text-orange-500">{a?.collection}</td>
                    <td>
                      <textarea
                        cols={30}
                        rows={2}
                        defaultValue={a?.message}
                        style={{
                          width: "300px",
                          fontSize: "13px",
                          background: "none",
                          color: "black",
                          borderRadius: "5px",
                          padding: "2px",
                        }}
                        readOnly
                      ></textarea>
                    </td>
                  </tr>
                ))
              }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KichenOrder;
