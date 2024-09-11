import React, { useCallback, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Compras(props){

    const { suscripciones, setSuscripciones, listaCuentas, setListaCuentas, productos, setProductos} = props;

    const [ tienda, setTienda ] = useState(false);
    const [ nombre, setNombre ] = useState("");
    const [ cantidad, setCantidad] = useState(0);
    const [ pagar, setPagar ] = useState(false);

    const abrirCerrarTienda = useCallback(()=>{
        setTienda(!tienda);
    },[tienda])

    const abrirCerrarPagar = useCallback(()=>{
        setPagar(!pagar);
    },[pagar])

    const suscribir = useCallback((nombre, funcionValor)=>{
        let sub = [...suscripciones];
        let id = -1

        sub.forEach((elem, index)=>{
            if(elem.nombre === nombre){
                id = index;
                elem.valor = funcionValor(elem.valor);
            }
        })
        
        //seguro en caso de no existir.
        if(id === -1){
            let nuevaSub ={
                nombre: nombre,
                tipo: "Obligatorio",
                valor: funcionValor(0),
                cuenta: "Principal"
            }
            sub.push(nuevaSub);
        }

        setSuscripciones([...sub]);
    },[suscripciones, setSuscripciones])

    const comprar = useCallback((cuenta)=>{
        let lista = [...productos];
        let lista2 =[...listaCuentas];
        let tipo = "";
        let id = -1;
        let resto = -1;


        lista2.forEach((elem, index)=>{
            if(elem.nombre === cuenta){
                id = index;
                tipo = elem.tipo;
                resto = parseInt(elem.saldo - cantidad);
            }
        })

        lista.forEach((elem)=>{
            if(elem.nombre === nombre && tipo !== "Credito" && resto >= 0){
                elem.tienes = true;
                let sublista = elem.suscripcion;
                for(let i = 0; i < sublista.length ;i++){
                    suscribir(sublista[i].nombre, sublista[i].nuevoValor)
                }
            }else if(elem.nombre === nombre && tipo === "Credito"){
                elem.tienes = true;
                let sublista = elem.suscripcion;
                for(let i = 0; i < sublista.length ;i++){
                    suscribir(sublista[i].nombre, sublista[i].nuevoValor)
                }
            }
        })
        
        if(resto < 0 && tipo !== "Credito"){
            alert("Saldo insuficiente");
            setCantidad(0);
            setNombre("");
        }else{
            lista2[id].saldo = resto;
            setListaCuentas([...lista2]);
            setProductos([...lista]);
        }
    },[nombre, cantidad, listaCuentas, productos, setProductos, setListaCuentas, suscribir])

    return (
        <button className="Compras" onClick={abrirCerrarTienda}>
            Tienda / Compras

            <Modal isOpen={tienda}>
                <ModalHeader>
                    Tienda
                </ModalHeader>
                <ModalBody>
                    <table>
                        <tr><td>Nombre</td><td>Tipo</td><td>Estrato</td><td>Valor</td></tr>
                        {productos.map((elem, index)=>(
                            <tr>
                                <td>
                                    {elem.nombre}
                                </td>
                                <td>
                                    {elem.tipo}
                                </td>
                                <td>
                                    {elem.estrato}
                                </td>
                                <td>
                                    {elem.valor}
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        setNombre(elem.nombre);
                                        setCantidad(elem.valor);
                                        abrirCerrarTienda()
                                        abrirCerrarPagar()
                                    }} disabled={elem.tienes}>
                                        Comprar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button onClick={abrirCerrarTienda} >Cerrar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={pagar}>
                <ModalHeader>
                    Cuenta
                </ModalHeader>
                <ModalBody>
                    {listaCuentas.map((elem)=>{
                        return (
                            <button onClick={()=>{
                                comprar(elem.nombre)
                                abrirCerrarPagar();
                                abrirCerrarTienda();
                                }}>
                                {elem.nombre}
                            </button>
                        )
                    })}
                </ModalBody>
                <ModalFooter>
                    <button onClick={()=>{
                        setNombre("");
                        setCantidad(0);
                        abrirCerrarPagar();
                        abrirCerrarTienda();
                    }} >Cancelar</button>
                </ModalFooter>
            </Modal>
        </button>
    )
}