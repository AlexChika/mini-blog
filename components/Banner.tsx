const Banner = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-3 sm:px-10 py-3 sm:py-5 mb-10">
            <div>
                <h1 className="text-[2rem] sm:text-7xl">Devs Arise Blog</h1>
                <h2 className="mt-2 sm:mt-5 md:mt-0">
                    Welcome to {" "}
                    <span className="border-b-2 sm:border-b-4 border-b-[#ff8a75]">
                        Every Developers
                    </span>{" "}
                    Favourite blog in the Devosphere
                </h2>

            </div>

            <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
                New product feautures | The latest in technology | The weekly debugging nightmares & more
            </p>
        </div>
    )
}

export default Banner