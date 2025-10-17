import React, { useState } from "react";
import { db, ref, set, remove } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendData = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);

  const dataRef = ref(db, "secondsArray");

  const updateFirebase = async (updatedValues) => {
    try {
      await set(dataRef, updatedValues);
      toast.success("✅ Data updated!");
    } catch (error) {
      toast.error("❌ Error updating data");
      console.error(error);
    }
  };

  const sendValue = async (val) => {
    setLoading(true);
    const updated = [...values, `${val}s`];
    setValues(updated);
    await updateFirebase(updated);
    setLoading(false);
  };

  const sendMultiple = async () => {
    setLoading(true);
    const generated = Array.from({ length: 10 }, () =>
      `${(Math.random() * 5).toFixed(1)}s`
    );
    const updated = [...values, ...generated];
    setValues(updated);
    await updateFirebase(updated);
    setLoading(false);
  };

  const deleteAll = async () => {
    if (!window.confirm("⚠️ Delete all values?")) return;
    setLoading(true);
    try {
      await remove(dataRef);
      setValues([]);
      toast.info("🗑️ All data deleted!");
    } catch (error) {
      toast.error("❌ Error deleting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Send Array Data to Firebase
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-lg w-[340px]">
        {[1, 2, 3, 4].map((val) => (
          <button
            key={val}
            onClick={() => sendValue(val)}
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-60"
          >
            Send {val}s
          </button>
        ))}

        <button
          onClick={sendMultiple}
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-all duration-200 disabled:opacity-60 col-span-2"
        >
          Send 10 Random Values (1–5s)
        </button>

        <button
          onClick={deleteAll}
          disabled={loading}
          className="bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition-all duration-200 disabled:opacity-60 col-span-2"
        >
          Delete All Data
        </button>
      </div>

      {loading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="loader"></div>
          <p className="text-gray-600 mt-2">Processing...</p>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />

      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SendData;
