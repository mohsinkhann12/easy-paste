import React, { useState } from "react";
import { FaTrash, FaEdit, FaTimes, FaGripVertical } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ManagePage = ({ setShowManage, clips, setClips }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showEditedMessage, setShowEditedMessage] = useState(false);

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this clip?")) {
      const updatedClips = clips.filter((_, i) => i !== index);
      setClips(updatedClips); // Update state
      await chrome.storage.sync.set({ clips: updatedClips });
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(clips[index].title);
    setEditContent(clips[index].content);
  };

  const saveEdit = async () => {
    const updatedClips = [...clips];
    updatedClips[editIndex] = { title: editTitle, content: editContent };
    setClips(updatedClips); // Update state
    await chrome.storage.sync.set({ clips: updatedClips });
    setEditIndex(null);
    setShowEditedMessage(true);
    setTimeout(() => setShowEditedMessage(false), 3000);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedClips = [...clips];
    const [movedClip] = reorderedClips.splice(result.source.index, 1);
    reorderedClips.splice(result.destination.index, 0, movedClip);

    setClips(reorderedClips); // Update state
    await chrome.storage.sync.set({ clips: reorderedClips });
  };

  return (
    <div className="w-80 p-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-lg font-bold text-gray-800 text-center">
        Manage Clips
      </h2>
      <p className="text-sm text-gray-500 text-center">
        Total Clips: {clips.length}/10
      </p>
      <button
        className="w-full p-2 mt-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition"
        onClick={() => setShowManage(false)}
      >
        Back
      </button>

      {editIndex !== null && (
        <div className="mt-4 p-2 border rounded bg-white shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-700">Edit Clip</h3>
            <button
              className="text-gray-200 hover:text-gray-700 bg-gray-700 hover:bg-gray-200 rounded-full p-1"
              onClick={() => setEditIndex(null)}
            >
              <FaTimes />
            </button>
          </div>
          <input
            className="w-full p-1 border rounded mt-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="w-full p-1 border rounded mt-1 resize-none"
            style={{
              overflowY:
                editContent.split("\n").length > 3 ? "scroll" : "hidden",
            }}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Content"
            rows={Math.min(Math.max(editContent.split("\n").length, 2), 3)}
          />
          <button
            className="w-full p-2 mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
            onClick={saveEdit}
          >
            Save Changes
          </button>
        </div>
      )}

      {showEditedMessage && (
        <span className="text-sm text-green-500 font-bold mt-2">
          Clip Edited successfully
        </span>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="clips-list">
          {(provided) => (
            <div
              className="mt-2 overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {clips.map((clip, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-2 mb-2 border border-gray-300 rounded bg-gray-50 shadow-sm flex items-center gap-2"
                    >
                      {/* Edit and Delete Buttons */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEdit(index)}
                        >
                          <FaEdit />
                        </button>
                      </div>

                      {/* Clip Content */}
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 font-medium truncate">
                          {clip.title}
                        </span>
                        <p className="text-gray-700 font-medium line-clamp-2 w-40">
                          {clip.content}
                        </p>
                      </div>

                      {/* Drag Icon (Only this part is draggable) */}
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab text-gray-500 hover:text-gray-700"
                      >
                        <FaGripVertical size={18} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ManagePage;
