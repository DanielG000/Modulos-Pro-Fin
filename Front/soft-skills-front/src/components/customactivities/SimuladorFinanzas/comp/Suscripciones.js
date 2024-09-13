import React, { useCallback, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Suscripciones(props){

    const { suscripciones, setSuscripciones, listaCuentas} = props;

    const [ tabla, setTabla ] = useState(false);
    const [ adicionar, setAdicionar] = useState(false);
    const [ nuevo, setNuevo ] = useState({tipo: "Precindible", cuenta: "Principal"})

    const abrirCerrarTabla = useCallback(()=>{
        setTabla(!tabla);
    },[tabla])

    const abrirCerrarAdicionar = useCallback(()=>{
        setAdicionar(!adicionar);
    },[adicionar])

    const actualizarNuevo = useCallback((dato, valor)=>{
        let nv = nuevo;
        if(dato === 1){
            nv.nombre = valor;
        }else if(dato === 2){
            nv.tipo = valor;
        }else if(dato === 3){
            nv.cuenta = valor;
        }else if(dato === 4){
            nv.valor = valor;
        }

        setNuevo({...nv});
    },[nuevo]);

    const crear = useCallback(()=>{
        let lista = suscripciones;

        lista.push(nuevo);
        setNuevo({tipo: "Precindible", cuenta: "Principal"});

        setSuscripciones([...lista])
    },[nuevo, suscripciones, setSuscripciones])

    const eliminar = useCallback((id)=>{
        let lista = []

        suscripciones.forEach((elem, index)=>{
            if(index !== id){
                lista.push(elem);
            }
        })

        setSuscripciones(lista);
    },[suscripciones, setSuscripciones])

    return(
        <button className="Suscripciones" onClick={abrirCerrarTabla}>
            Sevicios y Suscripciones

            <Modal isOpen={tabla}>
                <ModalHeader>
                    Servicios y Suscripciones.
                </ModalHeader>
                <ModalBody>
                    <table>
                        <tr><td>Nombre</td><td>Tipo</td><td>Cuenta</td><td>Valor</td></tr>
                        {suscripciones.map((elem, index)=>(
                            <tr key={index}>
                                <td>
                                    {elem.nombre}
                                </td>
                                <td>
                                    {elem.tipo}
                                </td>
                                <td>
                                    {elem.cuenta}
                                </td>
                                <td>
                                    {elem.valor}
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        eliminar(index);
                                    }} disabled={elem.tipo === "Obligatorio" ? true: false} key={index}>
                                        -
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button onClick={()=>{
                        abrirCerrarTabla();
                        abrirCerrarAdicionar();
                    }}>Agregar</button>

                    <button onClick={abrirCerrarTabla}>Cerrar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={adicionar}>
                <ModalHeader>
                    Servicios y Suscripciones.
                </ModalHeader>
                <ModalBody>
                    <div>
                        Nombre: <input type="text" onChange={(e)=>{actualizarNuevo(1, e.target.value);}} ></input>
                    </div>
                    <div>
                        Tipo: <select name="tipo" onChange={(e)=>{
                            if(e.target.value === ""){
                                actualizarNuevo(2, "Precindible");
                            }else{
                                actualizarNuevo(2, e.target.value);
                            }
                        }} >
                            <option value="Precindible">Precindible</option>
                            <option value="Obligatorio">Obligatorio</option>
                        </select> 
                    </div>
                    <div>
                        Cuenta: <select name="cuenta" onChange={(e)=>{
                            if(e.target.value === ""){
                                actualizarNuevo(3, "Principal");
                            }else{
                                actualizarNuevo(3, e.target.value);
                            } 
                        }} >
                            {listaCuentas.map((elem, index)=>{
                                return(<option value={elem.nombre} key={index}>{elem.nombre}</option>)
                            })}
                        </select>
                    </div>
                    <div>
                        Valor: <input type="text" onChange={(e)=>{actualizarNuevo(4, parseInt(e.target.value));}} ></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={()=>{
                        crear(nuevo);
                        abrirCerrarAdicionar();
                        abrirCerrarTabla();
                    }}>Agregar</button>

                    <button onClick={()=>{
                        abrirCerrarAdicionar();
                        abrirCerrarTabla();
                    }}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </button>
    );
}