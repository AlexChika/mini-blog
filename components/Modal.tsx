"use client";

import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import VideoModal from "./VideoModal";

const features = [
  "Blog studio",
  "Live preview in studio",
  "Comments section",
  "Sanity Database update from UI",
  "NextJs Incremental SSG",
  "Likes",
];
const stack = ["Sanity", "TypeScript", "NextJs", "Tailwind"];
function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);

  function showVideoModal() {
    setVideoModal(true);
    setShowModal(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 5000);
  }, []);

  return (
    <>
      <section
        className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full z-30 bg-slate-900/60 flex justify-center items-center px-3 ${
          showModal ? "block" : "hidden"
        }`}
      >
        {/* modal body .... */}
        <div className="relative bg-white w-full max-w-lg rounded-xl">
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

          {/* Aim of project  && answer */}
          <div className="py-3 pl-5 md:pl-10 border-b">
            <h2 className="flex items-center md:text-lg font-semibold">
              <span className="block h-3 w-3 rounded-full bg-gradient mr-3" />
              <span>Aim of Project</span>
            </h2>

            {/* answer */}
            <div className="pl-5">
              <p className="flex items-center text-sm text-slate-600">
                <span className="h-2 w-2 rounded-full bg-gradient mr-3" />
                <span>To demonstrate SANITY and its applications</span>
              </p>
              <p className="flex items-center text-sm text-slate-600">
                <span className="block h-2 w-2 rounded-full bg-gradient mr-3" />
                <span>Implement blog features - likes and comments</span>
              </p>
            </div>
          </div>

          {/* project Feautures  && list */}
          <div className="py-3 pl-5 md:pl-10 border-b">
            <h2 className="flex items-center md:text-lg font-semibold">
              <span className="block h-3 w-3 rounded-full bg-gradient mr-3" />
              <span>Project Features</span>
            </h2>

            {/* list of feautures */}
            <div className="pl-5">
              {features.map((f, i) => {
                return (
                  <p
                    key={i}
                    className="flex items-center text-sm text-slate-600"
                  >
                    <span className="block h-2 w-2 rounded-full bg-gradient mr-3" />
                    <span>{f}</span>
                  </p>
                );
              })}
            </div>
          </div>

          {/* project stack  && list of stack */}
          <div className="py-3 pl-5 md:pl-10 border-b">
            <h2 className="flex items-center md:text-lg font-semibold">
              <span className="block h-3 w-3 rounded-full bg-gradient mr-3" />
              <span>Project Stack</span>
            </h2>

            {/* list of stack */}
            <div className="pl-5 flex justify-start flex-wrap">
              {stack.map((s, i) => {
                return (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-slate-300 to-slate-100 rounded-xl m-1 text-xs text-black px-2 py-1"
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </div>

          {/* footer */}
          <div className="flex flex-col items-center py-1 px-3">
            <p className="text-slate-400 text-sm">Powered by Sanity v3</p>
            <button
              onClick={showVideoModal}
              className="flex items-center text-slate-600 underline text-sm"
            >
              Watch
              <PlayCircleIcon className="h-6 w-6 text-amber-900" /> a
              Demonstration of Sanity Studio
            </button>
          </div>

          {/* close button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute -top-7 right-0 text-lg text-white/60"
          >
            ⓧ
          </button>
        </div>
      </section>

      <VideoModal setVideoModal={setVideoModal} videoModal={videoModal} />
    </>
  );
}
export default Modal;
