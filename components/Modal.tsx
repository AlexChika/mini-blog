"use client";

import { useEffect, useState } from "react";

// type ModalProp = {
//   modal: boolean;
//   hideModal: () => void;
// };

function Modal() {
  const [showModal, setShowModal] = useState(true);

  function hideModal() {
    setShowModal(false);
  }

  useEffect(() => {
    // if (localStorage.getItem("modal")) return;

    setTimeout(() => {
      setShowModal(true);
    }, 10_000);
  }, []);

  return (
    <section
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full z-30 bg-slate-900/60 flex justify-center items-center red px-3 ${
        showModal ? "block" : "hidden"
      }`}
    >
      {/* modal body .... */}
      <div className="relative bg-white w-full max-w-xl rounded-xl">
        {/* heading */}
        <div className="flex flex-col items-center bg-gray-200 rounded-t-xl p-3">
          <h2 className="text-lg md:text-xl">
            About{" "}
            <span className="font-bold italic text-gradient">Mini Blog</span>{" "}
            Project
          </h2>
          <p className="text-slate-600 text-sm">
            As always, this is just a portfolio project.
          </p>
        </div>

        {/* Aim of project */}
        <h2 className="flex items-center text-lg md:text-xl py-3 px-5 font-semibold">
          <span className="block h-3 w-3 rounded-full bg-black mr-3" />
          <span>Aim of Project</span>
        </h2>

        <div className="flex flex-col items-center mt-5">
          <p className="">As always, this is just a portfolio project.</p>
        </div>

        {/* close button */}
        <button
          onClick={hideModal}
          className="absolute -top-7 right-0 text-lg text-white/50"
        >
          ⓧ
        </button>
      </div>
    </section>
  );
}
export default Modal;
