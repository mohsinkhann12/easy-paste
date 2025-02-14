import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AddClipForm from "../components/AddClipForm";
import Clip from "../components/Clip";
import { getClips } from "../utils/storage";
import ManagePage from "./ManagePage";

const Popup = () => {
  const [clips, setClips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Fetch clips on mount
  useEffect(() => {
    getClips().then(setClips);
  }, []);

  // Function to show and hide success message
  const handleClipAdd = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  if (showManage) return <ManagePage setShowManage={setShowManage} clips={clips} setClips={setClips} />;

  return (
    <div className="w-80 p-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <Header />
      <div className="flex justify-center mt-2">
        <button
          className="w-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add Clip"}
        </button>
        <button
          className="w-1/2 p-2 ml-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition"
          onClick={() => setShowManage(true)}
        >
          Manage
        </button>
      </div>

      {showForm && <AddClipForm setClips={(clips) => { setClips(clips); handleClipAdd(); }} />}
      {showMessage && <span className="text-green-600 font-medium">Clip added Successfully</span>}
      <div className="mt-2 overflow-y-auto overflow-x-hidden max-h-60 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {!showForm && clips.map((clip, index) => (
          <Clip key={index} clip={clip} setClips={setClips} />
        ))}
      </div>
    </div>
  );
};
export default Popup;
