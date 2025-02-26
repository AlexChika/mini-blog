import Link from "next/link";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { StudioNavbar } from "sanity";

const _StudioNavbar = (props: any) => {
  return (
    <nav>
      <div className="flex items-center justify-between px-5 py-2 text-sm">
        <Link
          href="/"
          className="border-2 border-blue-300 bg-slate-300 text-white font-semibold flex items-center px-2 py-1 rounded-lg "
        >
          <PiArrowBendUpLeftBold className="h-5 w-5 text-[#ff8a75] mr-2" />

          <span className="text-gradient">Go to Website</span>
        </Link>

        <div className="hidden text-center sm:flex px-2 py-1 rounded-lg justify-center border-2 border-blue-300 bg-slate-300 text-sm">
          <h1 className="font-bold">Lets build together</h1>

          <Link
            href="https://www.alexchika.com"
            className="text-gradient font-bold ml-2"
          >
            https://www.alexchika.com
          </Link>
        </div>
      </div>
      <>{props.renderDefault(props)}</>
    </nav>
  );
};

export default _StudioNavbar;
