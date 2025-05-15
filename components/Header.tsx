import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-col lg:items-center text-center lg:flex-row lg:space-x-5 justify-between font-bold px-3 sm:px-10 py-3 sm:py-5 mb-10 border border-white bg-slate-100">
      {/* title */}
      <div>
        <Link
          href="/"
          className="block text-[2rem] md:text-4xl lg:text-5xl w-full lg:w-max italic text-gradient"
        >
          <span className="justify-between flex w-full gap-2 lg:w-max font-extrabold">
            Mini Blog <img className="h-full" src="/icon.svg" alt="logo" />
          </span>
        </Link>

        <h2 className="mt-2 sm:mt-5 lg:mt-0">
          Welcome to{" "}
          <span className="text-gradient font-bold"> Every Developers</span>{" "}
          Favourite blog in the{" "}
          <span className="text-gradient">Devosphere</span>
        </h2>
      </div>

      {/* desc */}
      <p className="mt-2 text-gray-400 max-w-sm mx-auto">
        New product feautures | The latest in technology | The weekly debugging
        nightmares & more
      </p>
    </header>
  );
};

export default Header;
