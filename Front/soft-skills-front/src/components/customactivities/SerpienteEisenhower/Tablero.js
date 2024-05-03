import React, { useRef } from "react";

export default function Tablero(porps){

    const ref = useRef();

    const canvas = ref.current;
    //// error en la funcion getContext para dibujar, a partir de aqui hace caer todo el render
    //const plano = canvas.getContext('2d');
    //plano.fillStyle = 'grey';
    //plano.fillRect(0.0,canvas.width, canvas.height);

    return (
        <canvas id="Tablero" ref={ref}>
        </canvas>
    )
}