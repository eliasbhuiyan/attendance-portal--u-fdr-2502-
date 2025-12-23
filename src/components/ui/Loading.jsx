import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-spin w-10 h-10 rounded-full border-2 border-b-white"></div>
    </div>
  );
};

export default Loading;
