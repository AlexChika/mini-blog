import Image from "next/image";
import Link from "next/link";
import { CodeBracketIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";

const Header = () => {
    return (
        <header className="flex items-center justify-between space-x-2 font-bold px-3 sm:px-10 py-2 bg-white border-b border-b-gray-200">
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <Image
                        className="rounded-full h-8 w-8 object-cover"
                        src="https://i.postimg.cc/JnPmqbCf/profiles-74fdb30c318494fa2bb9.png"
                        width={572}
                        height={763}
                        alt="alex chika picture as logo" />
                </Link>

                <h1 className="italic border-y border-y-[#ff8a75] p-1 px-2 bg-gray-100 flex">
                    <span className="text-xs">DEV ARISE</span>

                    <span className="flex items-center ml-1">
                        {
                            [5, 7, 9].map((s, ind) => {
                                return <span style={{ width: `${s}px`, height: `${s}px`, }} className={`block group-hover:bg-white transition-colors duration-200 ease-out bg-[#ff8a75] rounded-full mr-1`} key={ind}></span>
                            })
                        }
                    </span>

                </h1>
            </div>

            <div>
                <Link className="px-2 sm:px-5 py-1 text-sm md:text-base bg-gray-900 text-primary flex items-center rounded-full text-center" href="https://i-am-alex.netlify.app">
                    <span className="hidden sm:flex items-center">
                        Check me out lets build
                        <span className="mx-2 flex items-center"><CodeBracketIcon className="h-5 w-5" /></span>
                        together
                    </span>
                    <span className="sm:hidden flex items-center">
                        Let's<span className="mx-2 flex items-center"><CodeBracketIcon className="h-5 w-5" /></span>2geda
                    </span>
                </Link>
            </div>
        </header>
    )
}

export default Header