"use client"
import { useRef, useState, useEffect } from "react";
import general from "./general.module.css";

type SpinnerProps = {
    class: string,
    sm: boolean,
    stop: boolean
}

const Spinner = ({ class: cs, sm = false, stop = false }: SpinnerProps) => {
    const spinnerRef = useRef(null);

    return (
        <div
            ref={spinnerRef}
            className={`${cs} spinner ${sm ? "sm" : ""} ${stop ? "stop" : ""
                }`}
        >
            <span></span>
        </div>
    );
};

export default Spinner;


