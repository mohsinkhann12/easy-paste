import React, { useState } from "react";

const Clip = ({ clip }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(clip.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (content) => {
    const urlRegex = /^(https?:\/\/|www\.)[^\s]+$/i;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9]{7,15}$/;
  
    if (urlRegex.test(content)) {
      // Ensure the link starts with 'http://' or 'https://'
      const formattedUrl = content.startsWith("http") ? content : `https://${content}`;
      return (
        <a href={formattedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {content}
        </a>
      );
    } else if (emailRegex.test(content)) {
      return (
        <a href={`mailto:${content}`} className="text-blue-600 hover:underline" target="_blank">
          {content}
        </a>
      );
    } else if (phoneRegex.test(content)) {
      return (
        <a href={`tel:${content}`} className="text-blue-600 hover:underline" target="_blank">
          {content}
        </a>
      );
    }
    return content;
  };
  

  return (
    <div className="p-2 border border-gray-300 rounded-lg bg-gray-50 shadow-md flex flex-col w-full max-w-md mr-3 mb-1.5">
      {/* Upper Section */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700 truncate">{clip.title}</span>
        <button className="p-1 text-blue-700 hover:text-blue-500 text-xs font-medium" onClick={copyToClipboard}>
          {copied ? "Copied ✓" : "Copy ?"}
        </button>
      </div>
      {/* Lower Section */}
      <div className="text-base font-medium line-clamp-2 text-gray-800">{renderContent(clip.content)}</div>
    </div>
  );
};

export default Clip;
