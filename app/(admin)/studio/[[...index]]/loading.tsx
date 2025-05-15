"use client";

import Spinner from "components/Spinner";

export default function Loading() {
  return (
    <div>
      <Spinner sm />
      <span>loading...</span>
    </div>
  );
}
