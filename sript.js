
let temporizador = setTimeout("bucle()",1000)
let lienzo = document.querySelector("canvas")
lienzo.width = 512;
lienzo.height = 512;
let contexto = lienzo.getContext("2d")

// cojer los datos de Datetime 
function bucle(){
let fecha = new Date();


let hora = fecha.getHours();
let minuto = fecha.getMinutes();
let segundo = fecha.getSeconds();



// Dibujar
contexto.clearRect(0,0,512,512)
contexto.lineWidth = 5;
contexto.strokeStyle = "black";


// debujar numeros en reloj 
contexto.fillStyle = "black";
contexto.font = "40px Arial";
contexto.textAlign = "center";
contexto.textBaseline = "middle";
contexto.beginPath();
    // arco: xinicial, yinicial,radio,anguloinicial,angulofinal
contexto.arc(256, 256, 200, 0, Math.PI * 2);
contexto.stroke();

let radiusNumbers = 170;   // smaller radius → inside clock

for (let n = 1; n <= 12; n++) {
    let ang = n * (Math.PI * 2 / 12) - Math.PI / 2;

    let x = 256 + Math.cos(ang) * radiusNumbers;
    let y = 256 + Math.sin(ang) * radiusNumbers;

    contexto.fillText(n, x, y);
}




// Angulo a segundo
angulo_segundo = segundo*(Math.PI*2/60)
contexto.lineWidth = 5;
contexto.strokeStyle = "red";
contexto.beginPath();
contexto.moveTo(256,256);
contexto.lineTo(
    256+Math.cos(angulo_segundo)*200,
    256+Math.sin(angulo_segundo)*200

);
contexto.stroke();   

// Angulo a minutes
let angulo_minuto = minuto * (Math.PI*2/60) - Math.PI/2;

contexto.lineWidth = 25;
contexto.strokeStyle = "green";
contexto.beginPath();
contexto.moveTo(256,256);
contexto.lineTo(
    256+Math.cos(angulo_minuto)*150,
    256+Math.sin(angulo_minuto)*150

);
contexto.stroke(); 

// Angulo a hora
let angulo_hora = (hora % 12 + minuto/60) * (Math.PI*2/12) - Math.PI/2;
contexto.lineWidth = 45;
contexto.strokeStyle = "blue";
contexto.beginPath();
contexto.moveTo(256,256);
contexto.lineTo(
    256+Math.cos(angulo_hora)*100,
    256+Math.sin(angulo_hora)*100

);
contexto.stroke(); 



clearTimeout(temporizador);
temporizador = setTimeout("bucle()",1000)
}

