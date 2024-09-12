import React, { useCallback, useEffect, useRef, useState } from "react";

import useSound from 'use-sound';

import AlarmaDeCarro from '../../../../resources/sounds/Molestos/AlarmaDeCarro.mp3';

export default function Musica(props){

    const cajaRef = useRef();
    const botonRef = useRef();

    const { interruptor } = props;

    const [ activo, setActivo ] = useState(false);

    const [ emerger, setEmerger ] = useState(true);

    const [play, {stop} ] = useSound(AlarmaDeCarro);

    const cambiar = useCallback(()=>{
        if(activo === true){
            stop()
            if(interruptor === false){
                setEmerger(!emerger)
            }
        }
        setActivo(!activo);
        
    },[activo, interruptor, emerger, stop])

    useEffect(()=>{
        const tiempo = Math.floor(Math.random() * 20) * 3000;
        const id = setInterval(()=>{
            if(emerger && !activo){
                // activa nuevamente el boton
                setActivo(true);

                // revisa cuando ya enten montados en el DOM y la referencia deje de ser null o undefined
                const cajaLista = typeof cajaRef.current !== "undefined" && cajaRef.current !== null;
                const botonListo = typeof botonRef.current !== "undefined" && botonRef.current !== null;
                const montado = cajaLista && botonListo;
                if(montado){
                    botonRef.current.style.position = "relative"
                    botonRef.current.style.top = Math.floor( Math.random() * 80) + "%";
                    botonRef.current.style.left = Math.floor( Math.random() * 80) + "%";
                }
            }
        }, tiempo)

        return () => {
            clearInterval(id);
        }
    },[activo, emerger, play])

    useEffect(()=>{
        if(activo){
            play()
        }
    },[activo, play])

    return (
        <div ref={cajaRef} className="Musica">
        <button ref={botonRef} onClick={cambiar}>Musica: {activo ? "On" : "Off"}</button>
        </div>
    )
}