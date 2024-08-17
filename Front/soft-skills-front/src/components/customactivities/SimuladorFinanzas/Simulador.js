import React, { useCallback, useEffect, useState } from "react";

import Fecha from "./comp/Fecha";
import PanelInferior from "./comp/PanelInferior";

export default function Simulador(props){

    const [ numMes, setNunMes ] = useState(0);
    const [ salario, setSalario ] = useState(0);
    const [ saldo, setSaldo ] = useState(0)

    const mensualidad = useCallback((saldo, salario)=>{
        setSaldo(saldo + salario);
    },[])

    //funcion paso a paso
    const siguiente = useCallback(()=>{
        setNunMes( numMes + 1 );
        mensualidad(saldo, salario);
    },[numMes, mensualidad, saldo, salario]);

    useEffect(()=>{
        setSalario(2000000);
        setSaldo(2000000);
    },[])

    return(
        <div className="Simulador-Finanzas">
            <Fecha numMes={numMes}/>

            <PanelInferior salario={salario} saldo={saldo}/>
            <button className="Boton-Siguiente" onClick={siguiente}>Siguiente</button>
        </div>
    )
}