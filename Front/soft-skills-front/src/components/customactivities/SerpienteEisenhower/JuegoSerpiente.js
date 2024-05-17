import React, { useEffect, useState } from "react";
import Tablero from './Tablero'
import Marcador from './Marcador';
import Reloj from "./Reloj"

export default function JuegoSerpiente(){

    // Valores predefinidos

    const niveles = {
        1:{tamano: {ancho: 30, alto: 20}, tiempo: 5, descanso: 5},
        2:{tamano: {ancho: 40, alto: 30}, tiempo: 8, descanso: 5},
        3:{tamano: {ancho: 50, alto: 40}, tiempo: 11, descanso: 5},
        4:{tamano: {ancho: 50, alto: 40}, tiempo: 15, descanso: 0}
    }

    const direcciones = {
        neutral:    [0,0],
        arriba:     [0,-1],
        abajo:      [0, 1],
        derecha:    [1,0],
        izquierda:  [-1,0],
    }


    // Estados

    const [ mapa, setMapa ] = useState(niveles[1])
    const [ serpiente, setSerpiente ] = useState({
        direccion: direcciones.neutral,
        cabeza: [10,10],
        cola: [],
        largo: 2
    })
    const [ puntaje, setPuntaje] = useState(0)
    const [ interruptor, setInterruptor] = useState(false)
    const [ frutos, setFrutos ] = useState([])




    // Metodos

    const generarFruto = () => {
        let num = Math.floor(Math.random() * 4);
        let x = Math.floor(Math.random() * mapa.ancho);
        let y = Math.floor(Math.random() * mapa.alto);

        let valor = [50,30,20,10];
        let fruto = {tipo: num, valor: valor[num], posicion: {x: x, y: y}} ;

        setFrutos([...frutos, fruto])
    }

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
                if(nuevaCola.length > serpiente.largo){
                    nuevaCola.shift()
                }
                setSerpiente({...serpiente,
                    cabeza: nuevaCabeza,
                    cola:   nuevaCola,
                })
            }
        }
    }



    const cambiaDireccion = (e) => {
        const tecla = e.key;

        setInterruptor(true);

        if(tecla === "ArrowUp" || tecla === "W" || tecla === "w"){
            setSerpiente({...serpiente,
                direccion: direcciones.arriba,
            })
        }else if(tecla === "ArrowDown" || tecla === "S" || tecla === "s"){
            setSerpiente({...serpiente,
                direccion: direcciones.abajo,
            })
        }else if(tecla === "ArrowLeft" || tecla === "A" || tecla === "a"){
            setSerpiente({...serpiente,
                direccion: direcciones.izquierda,
            })
        }else if(tecla === "ArrowRight" || tecla === "D" || tecla === "d"){
            setSerpiente({...serpiente,
                direccion: direcciones.derecha,
            })
        }else{
            console.log("tecla no peritida");
            console.log(e.key);
        }
    }


    // Sin proposito / temporal
    function init (){
        setMapa(niveles[1])
        generarFruto();
        setPuntaje(puntaje + 1);
    }

    if(false){
        init()
    }

    useEffect(()=>{

        document.addEventListener('keydown', cambiaDireccion, true);
        document.removeEventListener('keydown', cambiaDireccion, false)

        let id = setInterval(()=>{
            moverse()
        },800)

        return () => clearInterval(id)
    })

    return(
        <div className="Juego-Serpiente">
            <Marcador puntaje={puntaje}/>
            <Reloj tiempo={5} interruptor={interruptor}/>
            <Tablero serpiente={serpiente} mapa={mapa}/>
        </div>
    )

}