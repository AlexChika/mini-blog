import Link from "next/link";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { useState } from "react";

const _StudioNavbar = (props: any) => {
  console.log({ props });
  const [revalidateType, setRevalidateType] = useState<"App" | "Page">("App");

  const id = "MiniBlogStudioRevalidateBtn";

  function handleRadioCheck(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "App" | "Page"
  ) {
    const button = document.querySelector(`#${id}`);
    if (e.target.checked) {
      if (type === "App") {
        setRevalidateType("App");
        button?.removeAttribute("disabled");
      } else {
        const slugInput = document.querySelector(
          `[name="mini-blog-post-slug"]`
        ) as HTMLInputElement;

        const value = slugInput?.value?.trim();

        if (value) button?.removeAttribute("disabled");
        else button?.setAttribute("disabled", "true");

        setRevalidateType("Page");
      }
    } else {
      button?.setAttribute("disabled", "true");
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value?.trim();
    if (revalidateType === "App") return;
    const button = document.querySelector(`#${id}`);

    if (value) button?.removeAttribute("disabled");
    else button?.setAttribute("disabled", "true");
  }

  async function revalidateHandler() {
    console.log("hit");
    if (!revalidateType) return;

    const slugInput = document.querySelector(
      `[name="mini-blog-post-slug"]`
    ) as HTMLInputElement;

    const value = slugInput?.value?.trim();

    if (revalidateType === "Page" && !value) return;

    const path = revalidateType === "App" ? "/" : `/${value}`;

    const url = `/api/revalidate?path=${path}&secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.revalidated) {
      alert("revalidated successfully");
    } else {
      alert("an error occured: " + data.message);
    }
  }

  return (
    <nav>
      <div className="flex items-center justify-between px-5 py-2 text-sm">
        <div className="flex gap-5">
          <Link
            href="/"
            className="border-2 border-blue-300 bg-slate-300 text-white font-semibold flex items-center px-2 py-1 rounded-lg "
          >
            <PiArrowBendUpLeftBold className="h-5 w-5 text-[#ff8a75] mr-2" />

            <span className="text-gradient">Go to Website</span>
          </Link>

          <div className="hidden sm:flex border-2 border-blue-300 bg-slate-300 font-semibold items-center px-2 py-1 rounded-lg">
            <input
              defaultChecked
              onChange={(e) => handleRadioCheck(e, "App")}
              type="radio"
              name="validate"
              id=""
            />
            &nbsp;
            <span className="font-semibold">App</span>
            &nbsp; &nbsp;
            <input
              onChange={(e) => handleRadioCheck(e, "Page")}
              type="radio"
              name="validate"
              id=""
            />
            &nbsp;
            <input
              onChange={handleSlugChange}
              className="px-1 py-0.5 bg-slate-200 text-black"
              type="text"
              name="mini-blog-post-slug"
              placeholder="Post - Paste Slug here"
            />
            &nbsp; &nbsp;
            <button
              onClick={revalidateHandler}
              id={id}
              className="disabled:opacity-40 disabled:cursor-not-allowed border-5 px-2 py-1 rounded-lg bg-red-50 border-[#ff8a75]"
            >
              <span className="text-gradient">Revaliate</span>
            </button>
          </div>
        </div>

        <div className="hidden text-center lg:flex px-2 py-1 rounded-lg justify-center border-2 border-blue-300 bg-slate-300 text-sm">
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
