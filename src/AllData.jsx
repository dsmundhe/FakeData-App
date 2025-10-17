import React, { useState, useEffect } from "react";
import { db, ref } from "./firebase";
import { onValue } from "firebase/database";

const AllData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(db, "secondsArray");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setData(Array.isArray(val) ? val : Object.values(val));
      else setData([]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 All Stored Data</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
          <ul className="divide-y divide-gray-200">
            {data.map((val, idx) => (
              <li key={idx} className="py-3 flex justify-between">
                <span className="font-medium text-gray-700">#{idx + 1}</span>
                <span className="text-gray-900 font-semibold">{val}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllData;
