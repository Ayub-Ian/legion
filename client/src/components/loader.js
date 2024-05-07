import React from "react";

export const Loader = ({ message = null }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="loader">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
        </div>
        {message && <p className="text-center">{message}</p>}
      </div>
    </>
  );
};
