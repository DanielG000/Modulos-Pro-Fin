import React, {  useEffect, useRef } from "react";

export default function Tablero(props){

    const { serpiente , mapa } = props;

    const ref = useRef()

    const pintar = async()=>{
        if( typeof ref.current !== "undefined" && ref.current !== null){

            const canvas = ref.current.getContext('2d');

            let ancho = Math.floor(canvas.canvas.width / mapa.tamano.ancho);
            let alto  = Math.floor(canvas.canvas.height / mapa.tamano.alto);

            canvas.fillStyle = 'gray';
            canvas.fillRect(0,0,canvas.canvas.width,canvas.canvas.height);

            canvas.fillStyle = 'green';
            let x1 = serpiente.cabeza[0] * ancho;
            let y1 = serpiente.cabeza[1] * alto;
            canvas.fillRect(x1,y1,ancho,alto);

            const hayNodos = serpiente.cola.length > 0;
            if(hayNodos){
                serpiente.cola.map((elemento) => {
                    let x1 = elemento[0] * ancho; 
                    let y1 = elemento[1] * alto;
                    canvas.fillRect(x1,y1,ancho,alto);
                    return(0)
                })
            }
        }
    }

    useEffect(()=>{
        pintar()
    })

    return (
        <div id="Tablero">
        <canvas ref={ref} ></canvas>
        </div>
    )
}