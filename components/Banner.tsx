import { ComputerDesktopIcon } from "@heroicons/react/24/solid";

const Banner = () => {
  return (
    <div className="flex flex-col items-center text-center lg:flex-row lg:space-x-5 justify-between font-bold px-3 sm:px-10 py-3 sm:py-5 mb-10 border border-white bg-slate-100 mt-">
      {/* title */}
      <div>
        <h1 className="flex justify-center lg:justify-start items-center w-max text-center text-[2rem] sm:text-6xl italic text-gradient">
          Mini Blog
        </h1>

        <h2 className="mt-2 sm:mt-5 md:mt-1 lg:mt-0">
          Welcome to{" "}
          <span className="text-gradient font-bold"> Every Developers</span>{" "}
          Favourite blog in the{" "}
          <span className="text-gradient">Devosphere</span>
        </h2>
      </div>

      {/* desc */}
      <p className="mt-2 md:mt-5 text-gray-400 max-w-sm">
        New product feautures | The latest in technology | The weekly debugging
        nightmares & more
      </p>
    </div>
  );
};

export default Banner;
