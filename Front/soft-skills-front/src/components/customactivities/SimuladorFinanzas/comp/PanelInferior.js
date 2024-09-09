import React from "react";
import Suscripciones from "./Suscripciones";
import Compras from "./Compras";

export default function PanelInferior(props){

    const { salario , saldo,  suscripciones, setSuscripciones, listaCuentas, setListaCuentas, productos, setProductos } = props;

    return (
        <div className="Panel-Inferior">
            <p>Salario: {salario}</p>
            <p>Saldo: {saldo}</p>
            <Suscripciones suscripciones={suscripciones} setSuscripciones={setSuscripciones} listaCuentas={listaCuentas} />
            <Compras suscripciones={suscripciones} setSuscripciones={setSuscripciones} listaCuentas={listaCuentas} setListaCuentas={setListaCuentas} productos={productos} setProductos={setProductos} />
        </div>
    )
}