import React, { useEffect, useState } from "react";

import useSound from 'use-sound';

import AlarmaDeCarro from '../../../../resources/sounds/Molestos/AlarmaDeCarro.mp3';

export default function Musica(props){

    const { interruptor } = props;

    const [ activo, setActivo ] = useState(false);

    const [ emerger, setEmerger ] = useState(true);

    const [play, {stop} ] = useSound(AlarmaDeCarro);

    const cambiar = ()=>{
        if(activo === true){
            stop()
        }
        setActivo(!activo);
        if(interruptor === false){
            setEmerger(!emerger)
        }
    }

    useEffect(()=>{
        const tiempo = Math.floor(Math.random() * 20) * 900;
        const id = setInterval(()=>{
            if(emerger){
                setActivo(true);
            }
            if(activo){
                play()
            }
        }, tiempo)

        return () => {
            clearInterval(id);
        }
    })

    return (
        <div className="Musica">
        <button onClick={cambiar}>Musica: {activo ? "On" : "Off"}</button>
        </div>
    )
}