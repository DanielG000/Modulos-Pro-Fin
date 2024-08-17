import React, { useCallback, useEffect, useState } from "react";

import Fecha from "./comp/Fecha";
import PanelInferior from "./comp/PanelInferior";

export default function Simulador(props){

    const [ numMes, setNunMes ] = useState(0);
    const [ deshabilitar, setDeshabilitado ] = useState(false)
    const [ salario, setSalario ] = useState(0);
    const [ saldo, setSaldo ] = useState(0);

    const balance = useCallback((saldo, salario)=>{
        setSaldo(saldo + salario);
    },[])

    //Final de la simulacion
    const simulacionFinalizada = useCallback(()=>{
        if(numMes + 1 === 35){
            setDeshabilitado(!deshabilitar);
        }
    },[numMes, deshabilitar])

    //funcion paso a paso
    const siguiente = useCallback(()=>{
        simulacionFinalizada()
        setNunMes( numMes + 1 );
        balance(saldo, salario);
    },[numMes, saldo, salario, simulacionFinalizada, balance]);


    useEffect(()=>{
        setSalario(2000000);
        setSaldo(2000000);
    },[])

    return(
        <div className="Simulador-Finanzas">
            <Fecha numMes={numMes}/>

            <PanelInferior salario={salario} saldo={saldo}/>
            <button className="Boton-Siguiente" onClick={siguiente} disabled={deshabilitar}>Siguiente</button>
        </div>
    )
}