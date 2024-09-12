import React, { useCallback, useEffect, useState } from "react";

import Fecha from "./comp/Fecha";
import PanelInferior from "./comp/PanelInferior";
import PanelCuentas from "./comp/PanelCuentas";
import PanelSuperior from "./comp/PanelSuperior";
import { Modal } from "reactstrap";

import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function Simulador(props){

    const { user } = useAuth0();

    const [ numMes, setNunMes ] = useState(0);
    const [ deshabilitar, setDeshabilitado ] = useState(false)
    const [ salario, setSalario ] = useState(0);
    const [ saldo, setSaldo ] = useState(2000000);
    const [ listaCuentas, setListaCuentas ] = useState([]);
    const [ productosFinancieros, setProductosFinancieros] = useState([]);
    const [ suscripciones, setSuscripciones ] = useState([])
    const [ productos, setProductos ] = useState([])
    const [ final, setFinal ] = useState(false)
    const [ calificacion, setCalificacion ] = useState(0)
    const [ estadisticas, setEstadisticas] = useState({})

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
        let nuevaEstadistica = {};

        let cdts = 0;
        let fics = 0;
        let debitos = 0;
        let creditos = 0;
        let digital = 0;
        let subs = 0;
        let compras = [];

        let totalDinero = 0;
        let totalDeuda = 0;

        let puntosInversion = 0;
        let puntosServicios = 0 ;
        let puntosCompras = 0;
        let puntosAhorro = 0;

        productosFinancieros.forEach((elem)=>{
            if(elem.cuenta !== null){
                if(elem.tipo === "CDT"){
                    cdts = cdts + 1;
                    puntosInversion = puntosInversion + 4;
                    totalDinero = totalDinero + elem.capital;
                }else if(elem.tipo === "FIC"){
                    fics = fics + 1;
                    puntosInversion = puntosInversion + 3;
                    totalDinero = totalDinero + elem.capital;
                }
            }
        })

        listaCuentas.forEach((elem)=>{
            if(elem.tipo === "Debito" && elem.saldo !== 0){
                debitos = debitos + 1;
                totalDinero = totalDinero + elem.saldo;
                if(elem.interes !== 0){
                    puntosAhorro = puntosAhorro + 2;
                }
            }else if(elem.tipo === "Credito" && elem.saldo !== 0){
                creditos = creditos + 1;
                totalDeuda = totalDeuda + elem.saldo;
                puntosAhorro = puntosAhorro - 1;
            }else if(elem.tipo === "Digital"){
                digital = digital + 1;
                totalDinero = totalDinero + elem.saldo;
            }
        })

        suscripciones.forEach((elem)=>{
            if(elem.valor !== 0){
                subs = subs + 1;
                if(elem.tipo === "Obligatorio"){
                    puntosServicios = puntosServicios + 2;
                }else{
                    puntosServicios = puntosServicios - 2;
                }
            }
        })

        let puntoPorProducto = {
            "Casa/Departamento 1":20,
            "Casa/Departamento 2":22,
            "Moto":15,
            "Carro":10,
            "Perro":2,
            "Gato":2,
            "Computadora":5,
            "Nevera":8,
        }

        productos.forEach((elem)=>{
            if(elem.tienes){
                puntosCompras = puntosCompras + puntoPorProducto[elem.nombre];
                compras.push(elem.nombre);
            }
        })


        puntaje = puntosAhorro + puntosCompras + puntosInversion + puntosServicios;
        nuevaEstadistica = {
            "Inversion y Ahorro": {
                CDTs: cdts,
                FICs: fics,
                Debitos: debitos,
                Digital: digital,
                TotalDinero: totalDinero,
            },
            Deuda:{
                Creditos: creditos,
                TotalDeuda: totalDeuda,
            },
            Servicios:{
                Suscripciones: subs,
            },
            Compras: compras,
            Puntaje: {
                PuntosAhorro: puntosAhorro,
                PuntosInversion: puntosInversion,
                PuntosServicios: puntosServicios,
                PuntosCompras: puntosCompras,
                Total: puntaje,
            }
        }

        setEstadisticas(nuevaEstadistica);
        setCalificacion(puntaje);
    },[productosFinancieros, listaCuentas, suscripciones, productos])

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

    const finalizar = useCallback(async ()=>{

        const answerData = {
            user_email: user.email,
            activity_id: 12,
            question_number: 1,
            answer_text: calificacion,
        };

        await axios
            .post(`${process.env.REACT_APP_API_HOST}/answer`, answerData)
            .then((response) => {
                console.log(`Calificación guardada:`, response.data);
                setFinal(false);
                alert("Calificación guardada.");
                return <Navigate to="/courses/4" />;
            })
            .catch((error) => {
                alert("Error al guardar la calificación. \n\n Intenta nuevamente dentro de unos segundos.");
                console.error(`Error al guardar calificación:`, error);
            });
    },[user, calificacion])

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
            <PanelCuentas numMes={numMes} listaCuentas={listaCuentas} setListaCuentas={setListaCuentas}/>
            <PanelInferior salario={salario} saldo={saldo} suscripciones={suscripciones} setSuscripciones={setSuscripciones} listaCuentas={listaCuentas} setListaCuentas={setListaCuentas} productos={productos} setProductos={setProductos} />
            <button className="Boton-Siguiente" onClick={siguiente} disabled={deshabilitar}>Siguiente</button>
            
            <Modal isOpen={final}>
                <div>
                    <h2>Felicitaciones</h2>
                    {calificacion}
                    <h5>Estadisticas</h5>
                    {final? (
                        <table>
                            <tr>
                                <td>Inversion y Ahorro</td><td>Deuda</td><td>Servicios</td><td>Compras</td><td>Puntaje</td>
                            </tr>
                            <tr>
                                <td>
                                    <ul>
                                        <li>CDTs: {estadisticas["Inversion y Ahorro"].CDTs}</li>
                                        <li>FICs: {estadisticas["Inversion y Ahorro"].FICs}</li>
                                        <li>Cuentas Debito: {estadisticas["Inversion y Ahorro"].Debitos}</li>
                                        <li>Cuentas Digitales: {estadisticas["Inversion y Ahorro"].Digital}</li>
                                        <li>Dinero Total: {estadisticas["Inversion y Ahorro"].TotalDinero}</li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>Creditos: {estadisticas.Deuda.Creditos}</li>
                                        <li>Deuda Total: {estadisticas.Deuda.TotalDeuda}</li>
                                    </ul>
                                </td>
                                <td>
                                    Cantidad de Servicios/Suscripciones: {estadisticas.Servicios.Suscripciones}
                                </td>
                                <td>
                                    <ul>
                                        {estadisticas.Compras.map((elem)=>{
                                            return(<li>{elem}</li>)
                                        })}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>Puntos por Ahorro: {estadisticas.Puntaje.PuntosAhorro}</li>
                                        <li>Puntos por Invertir: {estadisticas.Puntaje.PuntosInversion}</li>
                                        <li>Puntos por Presupuestos/Servicios: {estadisticas.Puntaje.PuntosServicios}</li>
                                        <li>Puntos por Compras: {estadisticas.Puntaje.PuntosCompras}</li>
                                        <li>Total: {estadisticas.Puntaje.Total}</li>
                                    </ul>
                                </td>
                            </tr>
                        </table>
                    ):(<div></div>)}
                    <button onClick={finalizar}>Terminar</button>
                </div>
            </Modal>
        </div>
    )
}
/*          
            Deuda:{
                Creditos: creditos,
                TotalDeuda: totalDeuda,
            },
            Servicios:{
                Suscripciones: subs,
            },
            Compras: compras,
            Puntaje: {
                PuntosAhorro: puntosAhorro,
                PuntosInversion: puntosInversion,
                PuntosServicios: puntosServicios,
                PuntosCompras: puntosCompras,
                Total: puntaje,
            }
*/