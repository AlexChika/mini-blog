"use client";
// This file is a pure react component and must be used alongside the projectOverview css file.

// the css file should be imported in the root component or here

// change the props default for your unique project.

// edite the --base-color variable in the css

import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { SiNextdotjs, SiSanity, SiTypescript } from "react-icons/si";

export function ProjectOverviewModal({
  imgUrls = [
    "https://i.postimg.cc/Wp8qth9m/miniblog-port-1.png",
    "https://i.postimg.cc/YqSGFMV5/miniblog-port-2.png",
    "https://i.postimg.cc/cCFvzbKk/miniblog-port-3.png",
    "https://i.postimg.cc/j2xWZbjJ/miniblog-port-4.png",
  ],
  projectIconUrl = "/icon.svg",
  youtubeVidID = "-N_e3ZIkmKk",
  videoUrl = "valid url for video",
  posterUrl = "valid url for poster",
  open = true,
  id = "project_overview",
  projectName = "Mini Blog",
  description = `A Blog app demonstration of Sanity (CMS) studio. feauturing live preview, embedded sanity studio and mutating sanity from client"`,
  feautures = [
    "Embedded Sanity Studio",
    "Live preview in studio",
    "Sanity Database update from UI",
    "NextJs Incremental SSG",
    "Blog with likes and comments",
  ],
  aimOfProject = [
    "To demonstrate creating fullstack content apps using Sanity CMS",
    "Demonstrate integration and Customization with NextJS",
  ],
  stacks = [
    {
      name: "Sanity",
      icon: <SiSanity />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript />,
    },
    {
      name: "NextJs",
      icon: <SiNextdotjs />,
    },
  ],
}) {
  // Refs
  const ballRef = useRef(null);
  const ytRef = useRef(null);
  const videoRef = useRef(null);
  useDrag(ballRef, handleOpenCloseModal);
  const { fade, currIdx } = useFade({
    autoplay: false,
    interval: 50,
    noOfImages: imgUrls.length,
    wrapperClassName: id,
  });

  // States
  // controls fading banner image
  const [idx, setIndex] = useState(currIdx);

  // controls project overview open/close
  const [isOpen, setIsOpen] = useState(open);

  // controls video play
  const [play, setPlay] = useState(false);

  // controls video / summary mode
  const [videoMode, setVideoMode] = useState(true);

  function handleOpenCloseModal(action = "open") {
    if (action === "close") {
      setIsOpen(false);
      handleYtPlayPause("pause");
      return;
    }
    setIsOpen((prev) => !prev);
  }

  function handleYtPlayPause(action = "play") {
    const yt = ytRef.current;
    if (!yt) return;

    action === "play"
      ? (yt.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        ),
        setPlay(true))
      : (yt.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        ),
        setPlay(false));
  }

  /* ---------- Video implementation ---------- */
  // function handlePause() {
  //   if (!videoRef.current) return;
  //   setPlay(false);
  //   videoRef.current.pause();
  // }

  //   function handlePlay() {
  //     if (!videoRef.current) return;
  //     setPlay(true);
  //     videoRef.current.play();
  //   }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      console.log("handleEnded");
      setPlay(false);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video?.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(fade(true));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [imgUrls, fade]);

  return createPortal(
    <section className="pov_wrapper">
      {/* Ball */}
      <span
        ref={ballRef}
        className={`pov_overview_ball ${isOpen ? "" : "open"}`}
        style={{
          cursor: "move",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <span>Project</span>
        <span>Overview</span>
      </span>

      {/* Content */}
      <div className={`pov_overview_wrapper ${isOpen ? "open" : ""}`}>
        <div className={`pov_overview_body ${isOpen ? "open" : ""}`}>
          {/*Modal Close Button */}
          <button
            className="pov_overview_body_close_btn"
            onClick={() => handleOpenCloseModal("close")}
          >
            &times;
          </button>

          {/* Modal Banner */}
          <div className="pov_overview_body_banner">
            <div className="pov_banner_image_wrapper">
              {imgUrls.map((img, index) => {
                return (
                  <div data-name={id} key={index} className="pov_banner_image">
                    <img
                      key={index}
                      src={img}
                      alt={`${projectName} app screenshots`}
                    />
                  </div>
                );
              })}
            </div>

            <section className="pov_banner_content">
              <article>
                <div>
                  <h4>
                    <span>About</span> {projectName}
                  </h4>
                  <p>{description}</p>
                </div>

                <div className="pov_stack">
                  {stacks.map(({ name, icon }, index) => {
                    return (
                      <code key={index}>
                        {icon}
                        {name}
                      </code>
                    );
                  })}
                </div>
              </article>

              <figure>
                <div>
                  <img src={projectIconUrl} alt="" />
                </div>
              </figure>
            </section>

            <div className="pov_banner_btns">
              {imgUrls.map((_, i) => {
                return (
                  <span
                    style={{
                      border: i === idx ? "2px solid white" : "none",
                    }}
                    onClick={() => setIndex(fade(i))}
                    key={i}
                  />
                );
              })}
            </div>
          </div>

          {/* Video section */}
          <div
            className={`pov_overview_body_video ${
              videoMode ? "videoMode" : ""
            }`}
          >
            {/* <video controls ref={videoRef} poster={posterUrl} src={videoUrl} />  */}

            <iframe
              ref={ytRef}
              src={`https://www.youtube.com/embed/${youtubeVidID}?enablejsapi=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <div
              className={`pov_overview_body_video_overlay ${
                play ? "playing" : ""
              }`}
            >
              <h1 className="pov_video_overlay_heading">
                Watch a Short Overview Clip
              </h1>

              <button
                className="pov_video_overlay_playBtn"
                onClick={() => handleYtPlayPause("play")}
                // onClick={handlePlay}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </button>

              <div className="pov_video_overlay_footnote">
                <p>
                  Not interested in videos? Don&apos;t worry, Here is a brief
                  summary
                </p>

                <button onClick={() => setVideoMode(false)}>See Summary</button>
              </div>
            </div>
          </div>

          {/* Project Summary */}
          <div
            className={`pov_overview_summary  ${videoMode ? "videoMode" : ""}`}
          >
            <div className="pov_overview_summary_section">
              <h2 className="pov_overview_summary_header">
                <span className="pov_summary_bullet pov_summary_bullet_large" />
                <span>Aim of Project</span>
              </h2>

              <div className="pov_overview_summary_list">
                {aimOfProject.map((aim, index) => {
                  return (
                    <p key={index}>
                      <span className="pov_summary_bullet pov_summary_bullet_small"></span>
                      <span>{aim}</span>
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="pov_overview_summary_section">
              <h2 className="pov_overview_summary_header">
                <span className="pov_summary_bullet pov_summary_bullet_large"></span>
                <span>Project Features</span>
              </h2>

              <div className="pov_overview_summary_list">
                {feautures.map((f, i) => (
                  <p key={i}>
                    <span className="pov_summary_bullet pov_summary_bullet_small"></span>
                    <span>{f}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="pov_overview_summary_section">
              <div className="pov_overview_summary_footnote">
                <p>
                  Not a fan of reading? Watch our quick app demonstration
                  instead!
                </p>

                <button onClick={() => setVideoMode(true)}>Watch Demo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>,
    document.body,
    "project_overview"
  );
}

function useFade({ noOfImages, wrapperClassName, autoplay, interval }) {
  const index = useRef(noOfImages - 1);

  // helper funcs
  const getElements = useCallback(() => {
    const els = [
      ...document.querySelectorAll(`[data-name="${wrapperClassName}"]`),
    ];
    return els;
  }, [wrapperClassName]);

  const nextIndex = useCallback(
    (index, action = true) => {
      let idx = null;
      if (typeof action === "boolean") {
        if (action) {
          idx = index + 1 <= noOfImages - 1 ? index + 1 : 0;
        } else {
          idx = index - 1 >= 0 ? index - 1 : noOfImages - 1;
        }
      } else if (typeof action === "number") {
        idx = action > noOfImages - 1 || action < 0 ? null : action;
      }

      return idx;
    },
    [noOfImages]
  );

  // image fader (applies fading effect)
  function _fade(el) {
    el.style.opacity = "0";
  }

  // image stacker (re-stacks the image and calls fade)
  const stack = useCallback(
    async function (index, action) {
      const imgEls = getElements(); // all images
      const topMostImage = imgEls[index];
      const nextImage = imgEls[nextIndex(index, action)];

      // stack images
      topMostImage.style.zIndex = "20";
      nextImage.style.zIndex = "10";
      nextImage.style.opacity = "1";

      imgEls.forEach((img, i) => {
        if (i !== index && i !== nextIndex(index, action)) {
          img.style.zIndex = "1";
          img.style.opacity = "1";
        }
      });

      _fade(topMostImage);
    },
    [nextIndex, getElements]
  );

  const fade = useCallback(
    function (action) {
      let idx = index.current;

      if (idx === undefined) return;
      if (nextIndex(idx, action) === null) return;

      stack(idx, action);
      index.current = nextIndex(idx, action);
      return index.current;
    },
    [nextIndex, stack]
  );

  // auto play effect...
  useEffect(() => {
    if (!autoplay) return;

    const timeout = setInterval(() => {
      fade(true);
    }, interval * 1000);

    return () => clearInterval(timeout);
  }, [interval, autoplay, fade]);

  return {
    fade,
    currIdx: index.current,
  };
} // implementation complete

function useDrag(ballRef, onClick) {
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0, isDragged: false });

  const move = useCallback(
    function (el, { x, y }) {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get element dimensions
      const rect = el.getBoundingClientRect();
      const elementWidth = rect.width;
      const elementHeight = rect.height;

      // Boundary checking
      const newX = Math.max(0, Math.min(x, viewportWidth - elementWidth));
      const newY = Math.max(0, Math.min(y, viewportHeight - elementHeight));

      // calculate new position
      ballRef.current.classList.add("dragging");
      ballRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      // ballRef.current.style.transition = "transform 0.1s linear";
    },
    [ballRef]
  );

  const getCoordinates = (event) => {
    if (event.touches) {
      return {
        x: event.touches[0]?.clientX,
        y: event.touches[0]?.clientY,
        type: "touch",
      };
    }
    return {
      x: event.clientX,
      y: event.clientY,
      type: "mouse",
    };
  };

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      if (!ballRef.current) return;

      const { x, y } = getCoordinates(e);
      if (!x || !y) return;

      // Calculate new position with offset
      let newX = x - dragOffset.current.x;
      let newY = y - dragOffset.current.y;

      /* ISSUE:
      ** 1. This function is sometimes called even when the ball element is not being dragged but clicked.
      ** 2. dragging the ball element fires the onClick event. Making it hard to differenciate when the ball element is being dragged and when it is being clicked.

      ** Solution:
      ** 1. Since the onClick handler will always fire when the ball is dragged, we need to implement a custom click handler to handle the click event.

      ** 2. To do this, we need to check if the onMove event is fired. If fired, then the ball is being dragged. else, the ball was just cliked.

      ** 3. However, from Issue 1, this onmove handler fires even when ball is clicked.

      ** 4. To fix this, we need to add a flag to check if the ball is being dragged or not by determining the difference between the current mouse position and the initial mouse position. targetting a range of > 1px difference to mean that the ball is being dragged.
    */

      // Get the previous position
      const prevX = lastMousePos.current.x;
      const prevY = lastMousePos.current.y;

      // Calculate the difference between the current mouse position and the initial mouse position
      const isDragging =
        Math.abs(newX - prevX) > 1 || Math.abs(newY - prevY) > 1;

      // Update the last mouse position
      lastMousePos.current = { ...lastMousePos.current, isDragged: isDragging };

      if (!isDragging) return; // don't update the position

      move(ballRef.current, {
        x: newX,
        y: newY,
      });
    },
    [ballRef, move]
  );

  const handleDragEnd = useCallback(
    (e) => {
      if (!ballRef.current) return;
      const oldPos = { ...lastMousePos.current };
      const { type } = getCoordinates(e);

      const rect = ballRef.current.getBoundingClientRect();

      // record the last mouse position
      ballRef.current.classList.remove("dragging");
      lastMousePos.current = {
        x: rect.x,
        y: rect.y,
        isDragged: false, // reset
      };

      // mouse events
      if (type === "touch") {
        document.removeEventListener("touchmove", handleDrag);
        document.removeEventListener("touchend", handleDragEnd);
        document.removeEventListener("touchcancel", handleDragEnd);
      } else {
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleDragEnd);
      }

      // if isDragged is false, then, handle click.
      if (!oldPos.isDragged) {
        onClick?.();
      }
    },
    [handleDrag, onClick, ballRef]
  );

  const handleDragStart = useCallback(
    (e) => {
      e.preventDefault();
      if (!ballRef.current) return;

      // Calculate the offset between click position and element's top-left corner
      const { x, y, type } = getCoordinates(e);
      const rect = ballRef.current.getBoundingClientRect();

      dragOffset.current = {
        x: x - rect.left,
        y: y - rect.top,
      };

      if (type === "touch") {
        document.addEventListener("touchmove", handleDrag, { passive: false });
        document.addEventListener("touchend", handleDragEnd);
        document.addEventListener("touchcancel", handleDragEnd);
      } else {
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleDragEnd);
      }
    },
    [ballRef, handleDrag, handleDragEnd]
  );

  useEffect(() => {
    const element = ballRef.current;
    if (!element) return;

    element.addEventListener("mousedown", handleDragStart);
    element.addEventListener("touchstart", handleDragStart, {
      passive: false,
    });

    return () => {
      element.removeEventListener("mousedown", handleDragStart);
      element.removeEventListener("touchstart", handleDragStart);
    };
  }, [handleDragStart, ballRef]);

  // set initl position of ball
  useEffect(() => {
    if (!ballRef.current) return;

    const rect = ballRef.current.getBoundingClientRect();

    lastMousePos.current = {
      x: rect.left,
      y: rect.top,
      isDragged: false,
    };
  }, [ballRef]);
} // implementation complete
