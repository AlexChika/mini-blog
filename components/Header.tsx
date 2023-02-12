import Image from "next/image";
import Link from "next/link";
import { CodeBracketIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";

const Header = () => {
    return (
        <header className="flex items-center justify-between space-x-2 font-bold px-3 sm:px-10 py-3">
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <Image
                        className="rounded-full h-8 w-8"
                        src="https://i.postimg.cc/QMtPzJth/alex.jpg"
                        width={600}
                        height={800}
                        alt="alex chika picture as logo" />
                </Link>

                <h1 className="italic border-y border-y-[#ff8a75] p-1 bg-gray-100">DEV ARISE</h1>
            </div>

            <div>
                <Link className="px-2 sm:px-5 py-2 text-sm md:text-base bg-gray-900 text-primary flex items-center rounded-full text-center" href="https://i-am-alex.netlify.app">
                    <span className="hidden sm:flex">
                        Check me out lets build
                        <span className="mx-2"><ComputerDesktopIcon className="h-5 w-5" /></span>
                        together
                    </span>
                    <span className="sm:hidden flex">
                        Let's<span className="mx-2"><CodeBracketIcon className="h-5 w-5" /></span>2geda
                    </span>
                </Link>
            </div>
        </header>
    )
}

export default Header