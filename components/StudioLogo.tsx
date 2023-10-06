"use client";

import Image from "next/image";

const StudioLogo = (props: any) => {
  const { renderDefault, title } = props;
  return (
    <div className="flex items-center space-x-2">
      <Image
        width={600}
        height={800}
        className="rounded-full object-cover h-7 w-7"
        src="https://i.postimg.cc/QMtPzJth/alex.jpg"
        alt="dev-arise"
      />

      <>{renderDefault(props)}</>
    </div>
  );
};

export default StudioLogo;
