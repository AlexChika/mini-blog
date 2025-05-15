"use client";

type SpinnerProps = {
  class?: string;
  sm?: boolean;
  stop?: boolean;
};

const Spinner = ({ class: cs, sm = false, stop = false }: SpinnerProps) => {
  return (
    <div className={`${cs} spinner ${sm ? "sm" : ""} ${stop ? "stop" : ""}`}>
      <span></span>
    </div>
  );
};

export default Spinner;
