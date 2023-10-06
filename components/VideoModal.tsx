import { useEffect, useRef } from "react";

type Props = {
  videoModal: boolean;
  setVideoModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function VideoModal(props: Props) {
  const { videoModal, setVideoModal } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePauseVideo() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    setVideoModal(false);
  }

  useEffect(() => {
    if (!videoRef.current || !videoModal) return;
    const video = videoRef.current;

    video.play();
  }, [videoModal]);

  return (
    <section
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full z-30 bg-slate-900/60 flex justify-center items-center px-3 ${
        videoModal ? "block" : "hidden"
      }`}
    >
      <div
        className={`absolute w-full aspect-video max-w-4xl  ${
          videoModal ? "block" : "hidden"
        }`}
      >
        <button
          onClick={handlePauseVideo}
          className="absolute z-10 -top-8 right-0 text-2xl text-white/60"
        >
          ⓧ
        </button>

        <video
          ref={videoRef}
          controls
          className="w-full h-full"
          src="/mini-blog.mp4"
        />
      </div>
    </section>
  );
}

export default VideoModal;
