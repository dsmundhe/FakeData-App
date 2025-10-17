import React, { useEffect, useState } from "react";
import { db, ref } from "./firebase";
import { onValue } from "firebase/database";

const ReadLiveData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(db, "secondsArray");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setData(Array.isArray(val) ? val : Object.values(val));
      else setData([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🔍 Live Data</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <ul className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl divide-y divide-gray-200">
          {data.map((val, idx) => (
            <li key={idx} className="py-2 flex justify-between">
              <span>#{idx + 1}</span>
              <span className="font-semibold">{val}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadLiveData;
