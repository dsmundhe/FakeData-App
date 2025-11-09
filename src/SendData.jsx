import React, { useState } from "react";
import { db, ref, set, remove } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendData = () => {
  const [loading, setLoading] = useState(false);

  const getTimestamp = () => {
    return new Date().toISOString().replace("T", " ").substring(0, 19);
  };

  // ✅ Push entry to selected node
  const pushToNode = async (nodeNumber) => {
    setLoading(true);
    try {
      const entryId = "entry" + Math.floor(Math.random() * 9999);
      const path = `reactionLogs/node${nodeNumber}/${entryId}`;

      await set(ref(db, path), {
        reaction_time_ms: Math.floor(Math.random() * 5000) + 500,
        timestamp: getTimestamp(),
      });

      toast.success(`✅ Data added to node${nodeNumber}!`);
    } catch (error) {
      console.error(error);
      toast.error("❌ Error sending data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE ALL reaction logs
  const deleteAllLogs = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete ALL reaction logs?"))
      return;

    setLoading(true);
    try {
      await remove(ref(db, "reactionLogs"));
      toast.info("🗑️ All reaction logs deleted!");

      // ✅ Optional: recreate empty node structure
      const initialStructure = {
        node1: { info: "ready" },
        node2: { info: "ready" },
        node3: { info: "ready" },
        node4: { info: "ready" },
        node5: { info: "ready" },
      };
      await set(ref(db, "reactionLogs"), initialStructure);

      toast.success("✅ Structure recreated automatically!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error deleting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Push Reaction Logs
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-lg w-[340px]">

        {[1, 2, 3, 4, 5].map((node) => (
          <button
            key={node}
            onClick={() => pushToNode(node)}
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-60"
          >
            Send → Node {node}
          </button>
        ))}

        {/* ✅ Delete All Button */}
        <button
          onClick={deleteAllLogs}
          disabled={loading}
          className="bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition-all duration-200 disabled:opacity-60 col-span-2"
        >
          Delete ALL Reaction Logs
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
