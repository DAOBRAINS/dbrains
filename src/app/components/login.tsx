import React from "react";
import { useState } from "react";

function Modal({ show, children}) {
    const [closed, setClosed] = useState(false);
  const modalContent = show ? (
    <div className="fixed z-10 top-0 left-0 flex items-center justify-center w-screen h-full backdrop-opacity-70 bg-white/30">
      <div className="w-[25rem] md:w-[30rem] h-fit bg-white p-3 flex flex-col items-center rounded-md">
        {children}
      </div>
    </div>
  ) : null;
  return modalContent;
}
export default Modal;
