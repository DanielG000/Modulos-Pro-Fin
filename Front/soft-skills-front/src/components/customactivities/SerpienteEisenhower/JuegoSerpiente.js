import React, { useCallback, useEffect, useMemo, useState } from "react";
import Tablero from './comp/Tablero'
import Marcador from './comp/Marcador';
import Reloj from "./comp/Reloj"
import Valores from "./comp/Valores";
import Intentos from "./comp/Intentos";
import Musica from "./comp/Musica";
import BotonTrampa from "./comp/BotonTrampa";
import Notificaciones from "./comp/Notificaciones";
import Flotante from "./comp/Flotante";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function JuegoSerpiente(){

    // datos usuario

    const { user } = useAuth0();

    // Valores predefinidos

    // Urgente UrgenteImportante Importante NoImportante
    // Abreviaciones U, UI, I, NI
    const valoresDefault = useMemo(()=>([50,30,15,10]),[]);

    const niveles = useMemo(()=>{
        return {
            1:{tamano: {ancho: 30, alto: 20}, tiempo: 5, matriz: null, descanso: 5},
            2:{tamano: {ancho: 40, alto: 30}, tiempo: 8, matriz: null, descanso: 5},
            3:{tamano: {ancho: 50, alto: 40}, tiempo: 11, matriz: null, descanso: 5},
            4:{tamano: {ancho: 50, alto: 40}, tiempo: 15, matriz: null, descanso: 0}
        };
    },[])

    const direcciones = useMemo(()=>{
        return {
            neutral:    [0,0],
            arriba:     [0,-1],
            abajo:      [0, 1],
            derecha:    [1,0],
            izquierda:  [-1,0],
        }
    },[]);

    const serpienteDefault = useMemo(()=>({
        direccion: direcciones.neutral,
        cabeza: [14,10],
        cola: [],
        largo: 2
    }),[direcciones]);


    // Estados

    const [ nivel, setNivel ] = useState(1)
    const [ mapa, setMapa ] = useState(niveles[nivel]);
    const [ serpiente, setSerpiente ] = useState(serpienteDefault);
    const [ puntaje, setPuntaje] = useState(0);
    const [ interruptor, setInterruptor] = useState(false);
    // Los valores son los puntos que dan los fruto.
    const [ valores, setValores] = useState(valoresDefault);
    const [ frutos, setFrutos ] = useState([]);
    const [ intentos, setIntentos ] = useState(0);
    // Finalización del juego
    const [ final, setFinal ] = useState(false);
    const [ descanso, setDescanso ] = useState(false);
    const [ puntajes, setPuntajes] = useState([])
    // boleano respaldo para no repeticion en cambio de nivel
    const [ seguro, setSeguro] = useState(false)

    // Metodos

    const generarFruto = useCallback(() => {
        let num = Math.floor(Math.random() * 4);
        let x = Math.floor(Math.random() * mapa.tamano.ancho);
        let y = Math.floor(Math.random() * mapa.tamano.alto);

        let repetido = false;
        if (frutos.length > 0){
            repetido = frutos.reduce((final, elem)=>{
                if(final === true){
                    return final
                }else if((elem.posicion.x === x && elem.posicion.y === y) || elem.tipo === num){
                    return true
                }else{
                    return false
                }
            },false)
        }

        let fruto = {tipo: num, valor: valores[num], posicion: {x: x, y: y}} ;

        let nuevaMatriz = mapa.matriz;

        if(!repetido){
            nuevaMatriz[x][y] = fruto;
            setMapa({...mapa, matriz: nuevaMatriz})
            setFrutos([...frutos, fruto])
        }
    },[frutos, mapa, valores])

    const eliminarFruto = useCallback((tipo) => {
        let nuevosFrutos = frutos;

        let index = nuevosFrutos.reduce((final, elem, idx)=>{
            if(final !== null){
                return final;
            }else if(elem.tipo === tipo){
                return idx;
            }else{
                return null
            }
        },null)

        nuevosFrutos.splice(index,1)
        setFrutos(nuevosFrutos)
    },[frutos])

    const racha = useCallback((tipo) => {
        let nuevosValores = valores;
        // si atrapa un U reinicia todos los valores.
        if(tipo === 0){
            nuevosValores = valoresDefault;

        // si atrapa un UI suma 30 si es menor o igual a 89
        // su limite de crecimiento aqui es de 119.
        }else if(tipo === 1 && valores[1] < 90){
            nuevosValores[tipo] = nuevosValores[tipo] + 30;

        // si atrapa un I y los UI valen menos, siempre y cuando los I sean menores a 90
        // los I suben en 10 y los UI suben en 20.
        }else if(tipo === 2 && valores[1] < valores[2] && valores[2] < 90){
            nuevosValores[1] = nuevosValores[1] + 20;
            nuevosValores[tipo] = nuevosValores[tipo] + 10;
        
        // si atrapa un I y su valor es menor a 100 suma de a 10.
        }else if(tipo === 2 && valores[2] < 100){
            nuevosValores[tipo] = nuevosValores[tipo] + 10;

        // si atrapa un NI, reinicia los I y le resta 5 a los UI.
        }else if(tipo === 3 && valores[2] > valoresDefault[2]){
            nuevosValores[1] = nuevosValores[1] - 5
            nuevosValores[2] = valoresDefault[2]
        }
        // para hacer tendador los U, en caso de valer menos que las urgentes importantes
        if(nuevosValores[0] < nuevosValores[1]){
            nuevosValores[0] = nuevosValores[1] + 5;
        }
        setValores(nuevosValores);
    },[valores, valoresDefault])

    const colision = useCallback((x, y) => {
        const dentroAncho = x > -1 && x < mapa.tamano.ancho;
        const dentroAlto = y > -1 && y < mapa.tamano.alto;
        const dentro = dentroAncho && dentroAlto;

        let tipo = null;
        let nuevaMatriz = mapa.matriz;
        let elemento = null;
        if(dentro){
            elemento = nuevaMatriz[x][y];
        }
        
        if(elemento !== null){
            tipo = elemento.tipo;
            setPuntaje(puntaje + elemento.valor)
            nuevaMatriz[x][y] = null;
            setMapa({...mapa, matriz: nuevaMatriz})
        }

        if(tipo !== null){
            eliminarFruto(tipo)
            racha(tipo);
        }
    },[mapa, puntaje, racha, eliminarFruto])

    const colisionCola = useCallback((x, y, cola)=>{
        return cola.reduce((choca, nCola)=>{
            let nuevo = x === nCola[0] && y === nCola[1]
            return (choca || nuevo)
        }, false)
    },[])

    const nuevoIntento = useCallback(()=>{
        setPuntaje(0)
        setIntentos(intentos + 1);
        setSerpiente({...serpienteDefault, cola: []});
        setValores(valoresDefault)
    },[intentos, serpienteDefault, valoresDefault])

    const moverse = () =>{
        const dentroAncho = serpiente.cabeza[0] > -1 && serpiente.cabeza[0] < mapa.tamano.ancho;
        const dentroAlto = serpiente.cabeza[1] > -1 && serpiente.cabeza[1] < mapa.tamano.alto;
        const dentro = dentroAncho && dentroAlto;

        if(dentro){
            let nuevaCabeza = serpiente.cabeza.map((valor, index)=>(valor + serpiente.direccion[index]))
            let nuevaCola = serpiente.cola

            let diferentes = serpiente.cabeza[0] !== nuevaCabeza[0] || serpiente.cabeza[1] !== nuevaCabeza[1]

            if(diferentes){
                nuevaCola.push(serpiente.cabeza)
                let largo = Math.floor(puntaje / 100)
                if(largo < serpiente.largo){
                    largo = serpiente.largo
                }

                if(nuevaCola.length > largo){
                    nuevaCola.shift()
                }
                setSerpiente({...serpiente,
                    cabeza: nuevaCabeza,
                    cola:   nuevaCola,
                    largo: largo,
                })
                if(colisionCola(nuevaCabeza[0], nuevaCabeza[1], nuevaCola)){
                    nuevoIntento()
                }else{
                    colision(nuevaCabeza[0], nuevaCabeza[1]);
                }
            }
        }else{
            nuevoIntento();
        }
    }


    const cambiarDireccion = useCallback((e) => {
        const tecla = e.key;

        if(direcciones.neutral[0] === serpiente.direccion[0] && direcciones.neutral[1] === serpiente.direccion[1] && !descanso){
            setInterruptor(true);
            if((tecla === "ArrowUp" || tecla === "W" || tecla === "w") && (serpiente.direccion[1] !== 1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.arriba,
                })
            }else if((tecla === "ArrowDown" || tecla === "S" || tecla === "s") && (serpiente.direccion[1] !== -1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.abajo,
                })
            }else if((tecla === "ArrowLeft" || tecla === "A" || tecla === "a") && (serpiente.direccion[0] !== 1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.izquierda,
                })
            }else if((tecla === "ArrowRight" || tecla === "D" || tecla === "d") && (serpiente.direccion[0] !== -1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.derecha,
                })
            }
        }else if(!descanso){
            if((tecla === "ArrowUp" || tecla === "W" || tecla === "w") && (serpiente.direccion[1] !== 1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.arriba,
                })
            }else if((tecla === "ArrowDown" || tecla === "S" || tecla === "s") && (serpiente.direccion[1] !== -1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.abajo,
                })
            }else if((tecla === "ArrowLeft" || tecla === "A" || tecla === "a") && (serpiente.direccion[0] !== 1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.izquierda,
                })
            }else if((tecla === "ArrowRight" || tecla === "D" || tecla === "d") && (serpiente.direccion[0] !== -1)){
                setSerpiente({...serpiente,
                    direccion: direcciones.derecha,
                })
            }
        }

    },[descanso, direcciones, serpiente])

    const crearMatriz = useCallback(() => {
        let nuevaMatriz = [];
        for( var x = 0; x < mapa.tamano.ancho; x++){
            nuevaMatriz.push([]);
            for( var y = 0; y < mapa.tamano.alto; y++){
                nuevaMatriz[x].push(null);
            }
        }
        setMapa({...mapa, matriz: nuevaMatriz})
    },[mapa])

    const detenerSerpiente = useCallback(()=>{
        let cambioSerpiente = serpiente;

        cambioSerpiente = {...cambioSerpiente, direccion: direcciones.neutral}

        setSerpiente(cambioSerpiente)
    },[serpiente, direcciones])

    const descansar = useCallback(()=>{
        setDescanso(true);
        alert("Vuelve dentro de 5 Minutos \n\n Te recomendamos no cambiar de pestaña.");
        setTimeout(()=>{
            setDescanso(false);
            setInterruptor(true);
        },(mapa.descanso * 60000));
    }, [mapa])

    const cambioNivel = useCallback(()=>{

        if( nivel < 4){
            detenerSerpiente();
            let puntos = puntajes;
            puntos.push(parseInt(puntaje/intentos));
            setPuntajes([...puntos]);
            setPuntaje(0);
            setFrutos([]);
            setValores(valoresDefault)

            let nuevoNivel = nivel + 1;
            setNivel(nuevoNivel);
            setMapa(niveles[nuevoNivel])

            descansar();
        }else{
            detenerSerpiente();
            setFinal(true);
        }
    },[nivel, niveles, puntaje, puntajes, intentos, detenerSerpiente, descansar, valoresDefault])

    const finalizar = useCallback(async()=>{

        let guardadosConExito = true

        puntajes.forEach(async(elem, index)=>{
            let answerData = {
                user_email: user.email,
                activity_id: 12,
                question_number: (index + 1),
                answer_text: elem,
            };

            await axios
            .post(`${process.env.REACT_APP_API_HOST}/answer`, answerData)
            .then((response) => {
                console.log(`Calificación guardada:`, response.data);
                guardadosConExito = guardadosConExito && true;
            })
            .catch((error) => {
                alert("Error al guardar la calificación. \n\n Intenta nuevamente dentro de unos segundos.");
                console.error(`Error al guardar calificación:`, error);
                guardadosConExito = guardadosConExito && false;
            });
        })

        if(guardadosConExito){
            setFinal(false);
            alert("Puntajes guardados con exito");
            return <Navigate to="/courses/4" />;
        }else{
            alert("Intenta nuevamente en unos momentos");
        }
    },[puntajes, user])

    useEffect(()=>{

        window.addEventListener('keydown', cambiarDireccion, true);
        document.addEventListener('visibilitychange', () => {if(document.visibilityState === "hidden"){nuevoIntento()}}, true);
        
        let id = setInterval(()=>{
            moverse()
            if(mapa.matriz === null){
                crearMatriz()
            }
            if(frutos.length < 3 && mapa.matriz !== null){
                generarFruto()
            }
        },200)

        return () => {
            clearInterval(id)
            window.removeEventListener('keydown', cambiarDireccion, true);
            document.removeEventListener('visibilitychange', () => {if(document.visibilityState === "hidden"){nuevoIntento()}}, true);
        }
    })

    useEffect(()=>{
        if(!interruptor && seguro !== interruptor){
            cambioNivel();
            setSeguro(interruptor)
        }else if(seguro !== interruptor){
            setSeguro(interruptor)
        }
    },[interruptor, seguro, cambioNivel])

    return(
        <div className="Juego-Serpiente">
            <Marcador puntaje={puntaje}/>
            <Reloj mapa={mapa} interruptor={interruptor} setInterruptor={setInterruptor}/>
            <Valores valores={valores}/>
            <Intentos intentos={intentos}/>
            <Tablero serpiente={serpiente} frutos={frutos} mapa={mapa}/>
            <BotonTrampa puntaje={puntaje} setPuntaje={setPuntaje}/>
            <Notificaciones interruptor={interruptor}/>
            <Musica interruptor={interruptor}/>
            <Flotante interruptor={interruptor}/>

            <Modal isOpen={final}>
                <ModalHeader>
                    Felicitaciones!
                </ModalHeader>
                <ModalBody>
                    <table>
                        <tr>
                            <td>Nivel</td><td>Puntaje</td>
                        </tr>
                        {puntajes.map((elem, index)=>{
                            return (<tr>
                                <td>
                                    Nivel {index + 1}:
                                </td>
                                <td>
                                    {elem}
                                </td>
                            </tr>)
                        })}
                        <tr>
                            <td>Total:</td>
                            <td>{puntajes.reduce((contador, elem)=>{return(contador + elem)},0)}</td>
                        </tr>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button onClick={finalizar}>
                        Terminar
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )

}