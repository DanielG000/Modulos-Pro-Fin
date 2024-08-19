import React from "react";

export default function Cuenta(props){

    const { datos } = props;


    return (
        <div className="Cuenta">
            <p className="Nombre">{datos.nombre}</p>
            <p className="Tipo">{datos.tipo}</p>
            <p className="Saldo">{datos.saldo}</p>
            <p className="Interes">{datos.interes}</p>
        </div>
    )
}