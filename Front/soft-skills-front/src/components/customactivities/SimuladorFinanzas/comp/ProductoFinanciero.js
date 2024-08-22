import React, { useCallback, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ProductoFinanciero(props){

    const { datos, numMes} = props;
    const [ informacion, setInformacion ] = useState(false);

    const abrirCerrarInformacion = useCallback(()=>{
        setInformacion(!informacion);
    },[informacion])

    const retirar = useCallback();

    const retiroMensual = useCallback();

    const estado = useCallback(()=>{
        if(datos.tipo === "CDT"){
            if(datos.tipoPago === "Mensual" && datos.cuenta !== null){

            }
        }else if(datos.tipo ==="FIC"){

        }
    },[datos, numMes])

    useEffect(()=>{
        estado()
    });

    return(
        <div className="Producto-Financiero">
            <div>
                {datos.id}
            </div>
            <div className="PF-Tipo">
                {datos.tipo}
            </div>
            {datos.tipo === "FIC" ? 
                (<div className="PF-Status">
                    Status: {datos.status}
                </div>)
                :(<div className="PF-Duracion">
                    Duración: {datos.duracion} Meses
                </div>)}
            <div className="PF-Capital">
                Capital: {datos.capital}
            </div>
            <button onClick={abrirCerrarInformacion}>
                ...
            </button>
            <Modal isOpen={informacion}>
                <ModalHeader>
                    {datos.tipo}
                </ModalHeader>
                <ModalBody>
                    <div>
                    {datos.id}
                    </div>
                    <div className="PF-Tipo">
                        Tipo: {datos.tipo}
                    </div>
                    {datos.tipo === "FIC" ? 
                    (<div className="PF-Status">
                        Status: {datos.status}
                    </div>):(<div className="PF-Duracion">{datos.duracion}</div>)}
                    <div className="PF-Capital">
                        Capital: {datos.capital}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={abrirCerrarInformacion}>Cerrar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}