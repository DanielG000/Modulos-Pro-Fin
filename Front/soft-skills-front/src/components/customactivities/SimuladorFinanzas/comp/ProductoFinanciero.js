import React, { useCallback, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ProductoFinanciero(props){

    const { datos, numMes, listaCuentas, setListaCuentas, productosFinancieros, setProductosFinancieros } = props;
    const [ informacion, setInformacion ] = useState(false);
    const [ elejirCuenta, setElejirCuenta ] = useState(false);
    const [ montoD, setMontoD ] = useState(false);
    const [ montoR, setMontoR ] = useState(false);
    const [ cantidad, setCantidad] = useState(0.0);
    const [ ultimoPago, setUltimoPago ] = useState(0);
    const [ ultimoRendimiento, setUltimoRendimiento ] = useState(0);

    const abrirCerrarInformacion = useCallback(()=>{
        setInformacion(!informacion);
    },[informacion])

    const abrirCerrarElejirCuenta = useCallback(()=>{
        setElejirCuenta(!elejirCuenta);
    },[elejirCuenta])

    const abrirCerrarMontoD = useCallback(()=>{
        setMontoD(!montoD);
    },[montoD])

    const abrirCerrarMontoR = useCallback(()=>{
        setMontoR(!montoR);
    },[montoR])

    const setOrigen = useCallback((nombre)=>{
        let productos = productosFinancieros;
        datos.cuenta = nombre;
        productos[datos.id] = datos;
        setProductosFinancieros([...productos])
    },[datos, productosFinancieros, setProductosFinancieros])

    const depositar = useCallback(()=>{
        let cuentas = [...listaCuentas];
        let productos = [...productosFinancieros]
        let idOrigen = -1;
        let resto = 0;
        let sumado = datos.capital + cantidad;

        cuentas.forEach((element, index) => {
            if(element.nombre === datos.cuenta){
                resto = element.saldo - cantidad;
                idOrigen = index;
            }
        });

        if(datos.cuenta === null){
            alert("No puedes depositar sin elejir una cuenta.");
        }else if(resto < 0){
            alert("No tiene saldo suficiente.");
        }else if(sumado < datos.capitalMinimo){
            alert("No cumple con la cantidad minima.");
        }else if(datos.tipo === "CDT" && datos.fechaInicio !== null && ((numMes - datos.fechaInicio) % datos.duracion) !== 0){
            alert("No se puede depositar durante el acuerdo");
        }else if(datos.tipo === "FIC" && datos.status !== "Abierto" && datos.tipoFondo === "Cerrado"){
            alert("Espera a que sea el fondo abra para invertir.")
        }else{
            cuentas[idOrigen].saldo = resto;
            datos.capital = sumado;
            datos.fechaInicio = numMes;
            datos.capitalInicial = sumado;
            productos[datos.id] = datos;
            setListaCuentas(cuentas);
            setProductosFinancieros(productos);
            setUltimoPago(numMes);
        }
    },[numMes, datos, cantidad, listaCuentas, setListaCuentas, productosFinancieros, setProductosFinancieros]);

    const retirar = useCallback((cantidad, retencion)=>{
        let cuentas = [...listaCuentas];
        let productos = [...productosFinancieros]
        let idOrigen = -1;
        let resto = datos.capital - cantidad;
        let sumado = cantidad;

        if(retencion){
            sumado = Number((cantidad - (cantidad * 0.07)).toFixed(2));
        }else{
            datos.capitalInicial = resto;
        }


        cuentas.forEach((element, index) => {
            if(element.nombre === datos.cuenta){
                sumado = Number((element.saldo + sumado).toFixed(2));
                idOrigen = index;
            }
        });


        if(datos.cuenta === null){
            alert("No puedes retirar sin una cuenta asociada.");
        }else if(resto < 0){
            alert("No puedes retirar esa cantidad. Saldo insuficiente.");
        }else if(datos.tipo === "CDT" && datos.fechaInicio !== null && ((numMes - datos.fechaInicio) % datos.duracion) !== 0 && !retencion && numMes !== datos.fechaInicio){
            alert("No se puede retirar durante el acuerdo");
        }else if(datos.tipo === "FIC" && datos.status !== "Abierto" && datos.tipoFondo === "Cerrado"){
            alert("Espera a que sea el fondo abra para retirar.");
        }else if(datos.tipo === "FIC" && datos.status !== "Cerrado" && datos.tipoFondo === "Abierto"){
            alert("Hay permanencia, se te penalizara sobre el capital por retirar antes de cumplir permanencia.");
        }else{
            cuentas[idOrigen].saldo = sumado;
            datos.capital = resto;
            datos.fechaInicio = numMes;
            productos[datos.id] = datos;
            setListaCuentas([...cuentas]);
            setProductosFinancieros([...productos]);
        }
    },[datos, listaCuentas, numMes, productosFinancieros, setListaCuentas, setProductosFinancieros])


    const pago = useCallback((numMes, ultimoPago)=>{
        let dinero = 0;
        if(datos.tipo === "CDT" && datos.tipoPago === "Final" && ((numMes - datos.fechaInicio) % datos.duracion) === 0 && numMes !== datos.fechaInicio && datos.cuenta !== null && datos.fechaInicio !== null ){
            dinero = Number((datos.capitalInicial * (Math.pow((1 + datos.interesMensual), datos.duracion) - 1)).toFixed(2));
            
            alert(`CDT: ${datos.id} \n Recibiste: ${dinero} \n Retencion: 7% \n Neto: ${dinero - (dinero * 0.07)} \n\nPuedes retirar tu capital.`);
            
            retirar(dinero, true);
            setUltimoPago(numMes);

        }else if(datos.tipo === "CDT" && datos.tipoPago === "Final" && ultimoPago !== numMes){

            setUltimoPago(numMes)

        }else if(datos.tipo === "CDT" && datos.tipoPago === "Mensual" && datos.cuenta !== null && ((numMes - datos.fechaInicio) % datos.duracion) !== 0 && numMes !== datos.fechaInicio && ultimoPago !== numMes){
            dinero = Number((datos.capitalInicial * datos.interesMensual).toFixed(2));
            

            if(typeof(dinero) !== typeof(0)){
                console.log("Operacion afectada", dinero, "No resulta un numero entero o flotante");
            }else{
                alert(`CDT: ${datos.id} \n Recibiste: ${dinero} \n Retencion: 7% \n Neto:  ${dinero - (dinero * 0.07)}`)
                setUltimoPago(numMes);
                retirar(dinero, true);
            }

        }else if(datos.tipo === "CDT" && ((numMes - datos.fechaInicio) % datos.duracion ) === 0 && datos.fechaInicio !== numMes && datos.capital >= 1 && ultimoPago === numMes){
            alert(`CDT: ${datos.id} \n Puedes retirar tu dinero`);
        }
    },[datos, retirar])

    const rendimiento = useCallback((numMes, ultimoRendimiento)=>{
        let productos = productosFinancieros;

        if(datos.tipo === "CDT" && ultimoRendimiento !== numMes && datos.capital > 0){
            setUltimoRendimiento(numMes);
            let ganancia = 0;
            // se divide el interes del mes al rendir/ejecutarse dos veces cada mes
            ganancia = Number((datos.capital * Number( datos.interesMensual ) ).toFixed(2));
            datos.capital = Number((datos.capital + ganancia).toFixed(2));
            
            if(datos.ultimoRendimiento !== numMes){
                datos.ultimoRendimiento = numMes;
                productos[datos.id] = {...datos};
                setProductosFinancieros([...productos]);
            }

        }else if (datos.tipo === "FIC" && ultimoRendimiento !== numMes && datos.capital !== 0){
            setUltimoRendimiento(numMes);
            let rango =[0,0];
            let interes = 0.0;
            let ganancia = 0;
            
            if(datos.riesgo === "Bajo"){
                rango = [1, 3];
            }else if(datos.riesgo === "Medio"){
                rango = [-2, 15];
            }else if(datos.riesgo === "Alto"){
                rango = [-50, 50];
            }

            if(rango[0] < 0){
                interes = Number((((Math.random() * (rango[1] - rango[0])) + rango[0])/100).toFixed(2))
            }else{
                interes = Number((((Math.random() * (rango[1] + rango[0])) - rango[0])/100).toFixed(2))
            }
            
            ganancia = Number((datos.capital * (interes)).toFixed(2))

            datos.capital = Number(parseFloat(datos.capital + ganancia).toFixed(2));
            
            if(datos.ultimoRendimiento !== numMes){
                datos.ultimoRendimiento = numMes;
                productos[datos.id] = {...datos};
                setProductosFinancieros([...productos]);
            }
        }else if(ultimoRendimiento !== numMes){
            setUltimoRendimiento(numMes);
        }


    },[datos, productosFinancieros, setProductosFinancieros]);

    const estado = useCallback((numMes)=>{
        let productos = productosFinancieros;

        let status = datos.status;

        if(datos.tipo === "FIC" && datos.tipoFondo === "Cerrado"){
            let num = numMes % datos.duracion;
            if(num === 0){
                status = "Abierto"
            }else{
                status = "Cerrado"
            }
        }else if(datos.tipo === "FIC" && datos.tipoFondo === "Abierto" && datos.permanencia !== null){
            if(datos.fechaInicio === null){
                status = "Abierto";
            }else if(datos.fechaInicio !== null){
                let actualMes = (numMes - datos.fechaInicio);
                if(actualMes < datos.permanencia){
                    status = "Cerrado";
                }else{
                    status = "Abierto";
                }
            }

        }else if(datos.tipo === "FIC" && datos.tipoFondo === "Abierto" && datos.permanencia === null){
            
            status = "Abierto";

        }

        if(datos.status !== status){
            datos.status = status;
            productos[datos.id] = {...datos};
            setProductosFinancieros([...productos]);
        }

    },[datos, productosFinancieros, setProductosFinancieros]);

    const rendir = useCallback((numMes, ultimoRendimiento, ultimoPago)=>{
        estado(numMes)
        if(ultimoPago !== numMes && ultimoRendimiento !== numMes && datos.capital === 0){
            setUltimoRendimiento(numMes);
            setUltimoPago(numMes);
        }else if(ultimoRendimiento !== numMes && ultimoPago === ultimoRendimiento){
            rendimiento(numMes, ultimoRendimiento);
        }else if(ultimoPago !== numMes && ultimoRendimiento === numMes && datos.tipo === "CDT"){
            pago(numMes, ultimoPago);
        }
    },[datos, rendimiento, pago, estado])

    const mostrarCDT = useCallback(()=>{
        return(
            <div>
                <div>
                    Id: {datos.id}
                </div>
                <div>
                    Interes E.A: {datos.interesEA * 100}%
                </div>
                <div>
                    Interes Mensual: {(datos.interesMensual * 100).toFixed(2)}%
                </div>
                <div>
                    Duración: {datos.duracion} Meses
                </div>
                <div>
                    Pago: {datos.tipoPago}
                </div>
                <div>
                    Capital Minimo: {datos.capitalMinimo}
                </div>
                <div>
                    riesgo: {datos.riesgo}
                </div>
                <div>
                    Capital Invertido: {datos.capital.toFixed(2)}
                </div>
                <div>
                    Inicio: {datos.fechaInicio + 1}
                </div>
                <div>
                    Cuenta: {datos.cuenta}
                </div>
            </div>
        );
    },[datos]);

    const mostrarFIC = useCallback(()=>{
        return(
            <div>
                <div>
                    Id: {datos.id}
                </div>
                <div>
                    Tipo de Fondo: {datos.tipoFondo}
                </div>
                {datos.permanencia ? (<div>
                    Permanencia: {datos.permanencia}
                </div>):(<div>
                    Permanencia: N/A
                </div>)}
                
                <div>
                    Duración: {datos.duracion} Meses
                </div>
                <div>
                    Capital Minimo: {datos.capitalMinimo}
                </div>
                <div>
                    Penalización: {datos.penalizacion}
                </div>
                <div>
                    Estado: {datos.status}
                </div>
                <div>
                    Riesgo: {datos.riesgo}
                </div>
                <div>
                    Capital: {datos.capital}
                </div>
                <div>
                    Fecha Inicio: {datos.fechaInicio ? datos.fechaInicio + 1 : ""}
                </div>
                <div>
                    Cuenta: {datos.cuenta}
                </div>
            </div>
        );
    },[datos]);


    useEffect(()=>{
        rendir(numMes, ultimoRendimiento, ultimoPago)
    },[numMes, ultimoRendimiento, ultimoPago, rendir]);


    return(
        <div className="Producto-Financiero" key={props.key}>
            <div>
                {datos.id}
            </div>
            <div className="PF-Tipo">
                {datos.tipo}
            </div>
            {datos.tipo === "FIC" ? 
                (datos.status === "Abierto" ? (
                    <div className="PF-Status-Open">
                        {datos.status}
                    </div>
                ):(
                    <div className="PF-Status-Close">
                        {datos.status}
                    </div>
                ))
                :(<div className="PF-Duracion">
                    {datos.duracion} Meses
                </div>)}
            <div className="PF-Capital">
                Capital: {datos.capital.toFixed(2)}
            </div>
            <button onClick={abrirCerrarInformacion}>
                ...
            </button>
            <Modal isOpen={informacion}>
                <ModalHeader>
                    {datos.tipo}
                </ModalHeader>
                <ModalBody>
                    {datos.tipo === "FIC" ? (mostrarFIC()):(mostrarCDT())}
                </ModalBody>
                <ModalFooter>
                    <button onClick={()=>{
                        abrirCerrarInformacion()
                        abrirCerrarElejirCuenta()
                    }}>Depositar</button>
                    <button onClick={()=>{
                        abrirCerrarInformacion();
                        abrirCerrarMontoR();
                    }} disabled={datos.cuenta? false : true}>Retirar</button>
                    <button onClick={abrirCerrarInformacion}>Cerrar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={elejirCuenta}>
                <ModalHeader>
                    Elejir Cuenta
                </ModalHeader>
                <ModalBody>
                    {listaCuentas.map((elem, index)=>{
                        return(<button onClick={()=>{
                            setOrigen(elem.nombre)
                            abrirCerrarMontoD()
                            abrirCerrarElejirCuenta()
                        }} key={index}>
                            {elem.nombre}
                        </button>);
                    })}
                </ModalBody>
                <ModalFooter>
                    <button onClick={()=>{
                        abrirCerrarElejirCuenta()
                        abrirCerrarInformacion()
                    }}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={montoD}>
                <ModalHeader>
                    Depositar
                </ModalHeader>
                <ModalBody>
                    Cantidad: <input onChange={(e)=>{
                        setCantidad(Number(parseFloat(e.target.value).toFixed(2)))
                        }} type="text" />
                </ModalBody>
                <ModalFooter>
                    <button onClick={()=>{
                        depositar();
                        abrirCerrarMontoD();
                        abrirCerrarInformacion();
                    }}>Aceptar</button>
                    <button onClick={()=>{
                        abrirCerrarMontoD();
                        abrirCerrarInformacion();
                    }}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={montoR}>
                <ModalHeader>
                    Retirar
                </ModalHeader>
                <ModalBody>
                    Cantidad: <input onChange={(e)=>{
                        setCantidad(Number(parseFloat(e.target.value).toFixed(2)))
                        }} type="text" />
                </ModalBody>
                <ModalFooter>
                    <button onClick={()=>{
                        retirar(cantidad,false);
                        abrirCerrarMontoR();
                        abrirCerrarInformacion();
                    }}>Aceptar</button>
                    <button onClick={()=>{
                        abrirCerrarMontoR();
                        abrirCerrarInformacion();
                    }}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}