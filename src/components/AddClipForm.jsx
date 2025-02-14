import React, { useState } from "react";
import { saveClip } from "../utils/storage";

const AddClipForm = ({ setClips }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    const newClip = { title, content };
    await saveClip(newClip);
    setClips(prev => [...prev, newClip]);
    setTitle("");
    setContent("");
  };
  
  return (
    <form className="mt-2 p-2 bg-gray-50 border border-gray-300 rounded shadow-sm" onSubmit={handleSubmit}>
      <input
        className="w-full p-1 border border-gray-300 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full p-1 border border-gray-300 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        required
        rows={content.split('\n').length}
        style={{ overflowY: "hidden" }}
      />
      <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition mt-2" type="submit">Save</button>
    </form>
  );
};
export default AddClipForm;
