import React, { useCallback, useEffect, useState } from "react";

import Fecha from "./comp/Fecha";
import PanelInferior from "./comp/PanelInferior";
import PanelCuentas from "./comp/PanelCuentas";
import PanelSuperior from "./comp/PanelSuperior";
import { Modal } from "reactstrap";

export default function Simulador(props){

    const [ numMes, setNunMes ] = useState(0);
    const [ deshabilitar, setDeshabilitado ] = useState(false)
    const [ salario, setSalario ] = useState(0);
    const [ saldo, setSaldo ] = useState(2000000);
    const [ listaCuentas, setListaCuentas ] = useState([]);
    const [ productosFinancieros, setProductosFinancieros] = useState([]);
    const [ suscripciones, setSuscripciones ] = useState([])
    const [ productos, setProductos ] = useState([])
    const [ final, setFinal ] = useState(false)
    const [ calificacion, setCalificacion ] = useState({})

    const balance = useCallback((salario)=>{
        let total = 0;
        let cuentasActualizadas = []
        listaCuentas.forEach((cuenta)=>{
            if(cuenta.nombre === 'Principal'){
                cuenta.saldo = cuenta.saldo + salario;
            }
            cuentasActualizadas.push(cuenta);
        });
        
        suscripciones.forEach((sub)=>{
            let cobro = sub.valor;
            cuentasActualizadas.forEach((cuenta)=>{
                if(cuenta.nombre === sub.cuenta){
                    cuenta.saldo = cuenta.saldo - cobro;
                }
            });
        });

        setListaCuentas(cuentasActualizadas);

        cuentasActualizadas.forEach((cuenta)=>{
            if(cuenta.tipo !== "Credito"){
                total = total + cuenta.saldo;
            }
        })
        
        setSaldo(total);
    },[listaCuentas, suscripciones])

    const calificar = useCallback(()=>{
        let puntaje = 0;

        setCalificacion(puntaje)
    },[])

    //Final de la simulacion
    const simulacionFinalizada = useCallback(()=>{
        if(numMes + 1 === 35){
            setDeshabilitado(!deshabilitar);
            setFinal(!final);
            calificar()
        }
    },[numMes, deshabilitar, final, calificar])

    //funcion paso a paso
    const siguiente = useCallback(()=>{
        simulacionFinalizada()
        setNunMes( numMes + 1 );
        balance(salario);
    },[numMes, salario, simulacionFinalizada, balance]);


    useEffect(()=>{
        let cuentasDefault = [
            {
                nombre: "Principal", 
                tipo: "debito", 
                saldo: 2000000, 
                interes: 0, 
                cuota: 0
            },
        ];

        let suscripcionesDefault = [
            {
                nombre: "Arriendo", 
                tipo: "Obligatorio", 
                cuenta: "Principal", 
                valor: 700000
            },
            {
                nombre: "Servicios Agua/Electricidad/Gas", 
                tipo: "Obligatorio", 
                valor: 300000, 
                cuenta: "Principal"
            },
            {
                nombre: "Mercado", 
                tipo: "Obligatorio", 
                valor: 500000, 
                cuenta: "Principal"
            },
            {
                nombre: "Transporte", 
                tipo: "Precindible", 
                cuenta: "Principal", 
                valor: 30000
            },
            {
                nombre: "Impuestos", 
                tipo: "Obligatorio", 
                cuenta: "Principal", 
                valor: 0
            },
        ];

        let productosDefault = [
            {
                nombre: "Casa/Departamento 1",
                tipo: "Lugar",
                estrato: 1,
                valor: 15000000, 
                tienes: false ,
                suscripcion: [
                    {
                        nombre: "Impuestos", 
                        nuevoValor: (num)=>{return (num + 11592)}
                    },
                    {
                        nombre: "Arriendo",
                        nuevoValor: (num)=>{return 0}
                    }
                ] 
            },
            {
                nombre: "Casa/Departamento 2",
                tipo: "Lugar",
                estrato: 3,
                valor: 25000000,
                tienes: false,
                suscripcion: [
                    {
                        nombre: "Impuestos", 
                        nuevoValor: (num)=>{return (num + 43855)}
                    },
                    {
                        nombre: "Arriendo",
                        nuevoValor: (num)=>{return 0}
                    }
                ] 
            },
            {
                nombre: "Moto",
                tipo: "Vehiculo",
                valor: 6000000,
                tienes: false,
                suscripcion: [
                    {
                        nombre: "Transporte",
                        nuevoValor: (num) => {return parseInt(num/2)}
                    },
                    {
                        nombre: "Impuestos",
                        nuevoValor: (num) => {return parseInt(num + (308500 / 12))}
                    }
                ]
            },
            {
                nombre: "Carro",
                tipo: "Vehiculo",
                valor: 6000000,
                tienes: false,
                suscripcion: [
                    {
                        nombre: "Transporte",
                        nuevoValor: (num) => {return parseInt(num/2)}
                    },
                    {
                        nombre: "Impuestos",
                        nuevoValor: (num) => {return parseInt(num + (487500 / 12))}
                    }
                ]
            },
            {
                nombre: "Perro",
                tipo: "Mascota",
                tienes: false,
                valor: 300000,
                suscripcion: [
                    {
                        nombre: "Mercado",
                        nuevoValor: (num) => {return (num + 60000)}
                    }
                ]
            },
            {
                nombre: "Gato",
                tipo: "Mascota",
                tienes: false,
                valor: 300000,
                suscripcion: [
                    {
                        nombre: "Mercado",
                        nuevoValor: (num) => {return (num + 60000)}
                    }
                ]
            },
            {
                nombre: "Computadora",
                tipo: "Objeto",
                tienes: false,
                valor: 1800000,
                suscripcion: [
                    {
                        nombre: "Servicios Agua/Electricidad/Gas",
                        nuevoValor: (num) => {return (num + parseInt(num/2))}
                    }
                ]
            },
            {
                nombre: "Nevera",
                tipo: "Objeto",
                valor: 1739500,
                tienes: false,
                suscripcion: [
                    {
                        nombre: "Mercado",
                        nuevoValor: (num) => {return parseInt(num/2)}
                    },
                    {
                        nombre: "Servicios Agua/Electricidad/Gas",
                        nuevoValor: (num) => {return (num + parseInt(num/2))}
                    }
                ]
            }
        ]

        setSalario(2000000);
        setListaCuentas(cuentasDefault);
        setSuscripciones(suscripcionesDefault);
        setProductos(productosDefault);
    },[])

    return(
        <div className="Simulador-Finanzas">
            <Fecha numMes={numMes}/>
            <PanelSuperior numMes={numMes} productosFinancieros={productosFinancieros} listaCuentas={listaCuentas} setProductosFinancieros={setProductosFinancieros} setListaCuentas={setListaCuentas}/>
            <PanelCuentas listaCuentas={listaCuentas} setListaCuentas={setListaCuentas}/>
            <PanelInferior salario={salario} saldo={saldo} suscripciones={suscripciones} setSuscripciones={setSuscripciones} listaCuentas={listaCuentas} setListaCuentas={setListaCuentas} productos={productos} setProductos={setProductos} />
            <button className="Boton-Siguiente" onClick={siguiente} disabled={deshabilitar}>Siguiente</button>
            
            <Modal isOpen={final}>
                <div>
                    <h2>Felicitaciones</h2>
                    {calificacion}
                    <h5>Estadisticas</h5>
                </div>
            </Modal>
        </div>
    )
}