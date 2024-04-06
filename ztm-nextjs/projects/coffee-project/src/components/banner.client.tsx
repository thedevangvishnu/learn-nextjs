"use client";

import { MouseEventHandler } from "react";

export default function Banner({
  handleOnClick,
  buttonText,
}: {
  handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
}) {
  return (
    <div className="container z-20 flex flex-col px-2 pt-2 md:pt-4 text-left">
      <h1 className="my-2 flex flex-wrap">
        <span className="pr-2 text-white">Coffee</span>
        <span className="text-gray-900">Connoisseur</span>
      </h1>
      <p className="font-sans text-xl font-semibold text-gray-900 md:mt-5 lg:text-2xl">
        Discover your local coffee shops!
      </p>

      <div className="mt-12">
        <button onClick={handleOnClick}>{buttonText}</button>
      </div>
    </div>
  );
}
