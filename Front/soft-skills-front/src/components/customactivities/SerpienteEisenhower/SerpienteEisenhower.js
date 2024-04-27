import React, { useEffect, useState} from "react";
import ResponsiveAppBar from "../../responsiveappbar/ResponsiveAppBar";
import axios from "axios";

import './SerpienteEisenhower.css'
import Presentacion from './Presentacion'
import Espera from '../../wait/Espera'
import JuegoSerpiente from './JuegoSerpiente'

export default function SerpienteEisenhower(){

    //State para información de la actividad solicitada del backend.
    const [activity, setActivity] = useState(null)
    //State booleano para la transicion de la presentacion al juego.
    const [jugando, setJugando] = useState(0)



    const getActivity = async () => {
        await axios
        .get(`http://127.0.0.1:8000/activity/9`)
        .then((response) => {
            setActivity(response.data);
        })
        .catch((error) => {
            console.error("Error al obtener los detalles de la actividad:", error);
        });
    }

    const jugar = () => {
        setJugando(1)
    }


    useEffect(()=>{getActivity()},[])


    return (
        <>
        <ResponsiveAppBar />
        <br/>
        {jugando===1? (<JuegoSerpiente />) : (!activity? (<Espera mensaje="Espera unos segundos" />) : (<Presentacion jugar={jugar} activity={activity}/>))}
        </>
    );
} 
