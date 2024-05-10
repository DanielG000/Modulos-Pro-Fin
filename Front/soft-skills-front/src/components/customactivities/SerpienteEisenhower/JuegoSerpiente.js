import React, { useState } from "react";
import Tablero from './Tablero'
import Marcador from "./Marcador";
import Reloj from "./Reloj"

export default function JuegoSerpiente(){

    const [ mapa, setMapa ] = useState({})
    const [ serpiente, setSerpiente ] = useState({})
    const [ frutos, setFrutos ] = useState([])
    const [ puntaje, setPuntaje] = useState(0)

    const [ tablero, setTablero ] = useState(null);


    let niveles = {
        1:{tamano: {ancho: 20, alto: 20}, tiempo: 3},
        2:{tamano: {ancho: 30, alto: 20}, tiempo: 4},
        3:{tamano: {ancho: 40, alto: 30}, tiempo: 6}
    }


    const generarFruto = () => {
        let num = Math.floor(Math.random() * 4);
        let x = Math.floor(Math.random() * mapa.ancho);
        let y = Math.floor(Math.random() * mapa.alto);

        let valor = [50,30,20,10];
        let fruto = {tipo: num, valor: valor[num], posicion: {x: x, y: y}} ;

        setFrutos([...frutos, fruto])
    }

    function init (){
        setMapa(niveles[1]);
        setSerpiente({
            cabeza: {x: 10, y: 10},
            cola: [],
            largo: 2
        });
        generarFruto();
        setPuntaje(puntaje + 1);
    }

    const dibujar = (serpiente)=>{
        tablero.fillStyle = 'gray';
        console.log("color");
        let ancho = Math.floor(tablero.canvas.width / mapa.tamano.ancho);
        let alto = Math.floor(tablero.canvas.height / mapa.tamano.alto);
        tablero.fillRect(0,0,tablero.canvas.width,tablero.canvas.height);

        //serpiente
        console.log('serpiente');
        tablero.fillStyle = 'black';
        let x1 = serpiente.cabeza.x * ancho;
        let y1 = serpiente.cabeza.y * alto;
        let x2 = x1 + ancho;
        let y2 = y1 + alto;
        tablero.fillRect(x1, y1, x2, y2)
    }

    if(false){init();dibujar(serpiente)}


    return(
        <div className="Juego-Serpiente">
            <Marcador puntaje={puntaje}/>
            <Reloj tiempo={5} interruptor={true}/>
            <Tablero setPlano={setTablero} />
        </div>
    )

}