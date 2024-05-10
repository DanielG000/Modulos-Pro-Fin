import React, { useRef } from "react";

export default function Tablero(props){


    const ref = useRef()

    return (
        <canvas id="Tablero" ref={ref} >
        </canvas>
    )
}