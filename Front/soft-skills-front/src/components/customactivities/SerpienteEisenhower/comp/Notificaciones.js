import React, { useState, useEffect, useCallback, useMemo} from "react";
import addNotification from 'react-push-notification';

export default function Notificaciones(props){

    const [ activo, setActivo] = useState(true);

    const info = useMemo(()=>{
        return {
            title: "Serpiente Eisenhower",
            message:"",
            duration: 20000,
            native: true,
        }
    },[])

    const mensajes = useMemo(()=>{
        return [
            "Vas muy bien, no te distraigas.", 
            "revisa bien el tiempo que te queda.", 
            "Cuantos puntos tienes, creo que romperas algun record.", 
            "¿Te esta gustando la actividad?"
        ]
    },[])

    const accion = useCallback(()=>{
        setActivo(!activo);
    },[activo])

    const notificar = useCallback(()=>{
        const index = Math.floor(Math.random() * mensajes.length)
        if(activo){
            addNotification({
                ...info,
                message: mensajes[index],
            })
        }
    },[activo, mensajes, info])

    useEffect(()=>{
        
        const tiempo = Math.floor(Math.random() * 20) * 3000;
        const id = setInterval(()=>{
            // si esta inactivo lo activa
            if(!activo){
                setActivo(true);
            }
            // si esta activo notifica cada vez
            notificar();
        }, tiempo)

        // cuando se vuelva activo notificara
        notificar();

        return () => {
            clearInterval(id);
        }
    },[activo, notificar])

    return (
        <div className="BotonNotificaciones">
            <button onClick={accion}>Notificaciones: {activo ? ("On") : ("Off")}</button>
        </div>
    )
}