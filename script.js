let temporizador; 
let lienzo = document.getElementById("clockCanvas"); 
lienzo.width = 512;
lienzo.height = 512;
let contexto = lienzo.getContext("2d");
let timezoneInput = document.getElementById("timezone");

// Function to get the current hours, minutes, and seconds based on the selected timezone
function getTimeComponentsAccurate(timezone) {
    let fecha = new Date();
    let hora, minuto, segundo;

    if (timezone === "UTC") {
        hora = fecha.getUTCHours();
        minuto = fecha.getUTCMinutes();
        segundo = fecha.getUTCSeconds();
        return { hora, minuto, segundo };
    } 
    
    if (timezone === "Local") {
        hora = fecha.getHours();
        minuto = fecha.getMinutes();
        segundo = fecha.getSeconds();
        return { hora, minuto, segundo };
    }

    // --- ACCURATE TIMEZONE HANDLING using Intl API ---
    
    // Create an array of time components for the selected timezone
    let parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false // Ensure 24-hour format
    }).formatToParts(fecha);

    // Map the components to variables
    for (let part of parts) {
        if (part.type === 'hour') {
            hora = parseInt(part.value);
            // Handle the case where the locale returns '24' for midnight (convert to 0)
            if (hora === 24) hora = 0; 
        } else if (part.type === 'minute') {
            minuto = parseInt(part.value);
        } else if (part.type === 'second') {
            segundo = parseInt(part.value);
        }
    }
    
    // Fallback for safety (should not be hit with Intl)
    if (hora === undefined) {
        console.error("Could not determine hour for timezone:", timezone);
        return getTimeComponentsAccurate("Local");
    }

    return { hora, minuto, segundo };
}


// The main drawing loop
function bucle() {
    // 1. Get the value from the combobox
    let selectedTimezone = timezoneInput.value;
    
    // 2. Get the time components based on the selected timezone
    let { hora, minuto, segundo } = getTimeComponentsAccurate(selectedTimezone);

    // --- Dibujar (Drawing) ---
    contexto.clearRect(0, 0, 512, 512);
    contexto.lineWidth = 5;
    contexto.strokeStyle = "black";

    // Draw Clock Face and Numbers
    contexto.fillStyle = "black";
    contexto.font = "40px Arial";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.beginPath();
    contexto.arc(256, 256, 200, 0, Math.PI * 2);
    contexto.stroke();

    let radiusNumbers = 170; 

    for (let n = 1; n <= 12; n++) {
        let ang = n * (Math.PI * 2 / 12) - Math.PI / 2;

        let x = 256 + Math.cos(ang) * radiusNumbers;
        let y = 256 + Math.sin(ang) * radiusNumbers;

        contexto.fillText(n, x, y);
    }

    // Angulo a segundo (Second Hand)
    // Angle: (current second / 60) * 360 degrees in radians - 90 degrees (start at 12)
    let angulo_segundo = segundo * (Math.PI * 2 / 60) - Math.PI / 2;
    contexto.lineWidth = 5;
    contexto.strokeStyle = "red";
    contexto.beginPath();
    contexto.moveTo(256, 256);
    contexto.lineTo(
        256 + Math.cos(angulo_segundo) * 200,
        256 + Math.sin(angulo_segundo) * 200
    );
    contexto.stroke();

    // Angulo a minuto (Minute Hand)
    let angulo_minuto = minuto * (Math.PI * 2 / 60) - Math.PI / 2;

    contexto.lineWidth = 25;
    contexto.strokeStyle = "green";
    contexto.beginPath();
    contexto.moveTo(256, 256);
    contexto.lineTo(
        256 + Math.cos(angulo_minuto) * 150,
        256 + Math.sin(angulo_minuto) * 150
    );
    contexto.stroke();

    // Angulo a hora (Hour Hand)
    // The hour angle also depends on the minutes for smooth movement
    let angulo_hora = (hora % 12 + minuto / 60) * (Math.PI * 2 / 12) - Math.PI / 2;
    contexto.lineWidth = 45;
    contexto.strokeStyle = "blue";
    contexto.beginPath();
    contexto.moveTo(256, 256);
    contexto.lineTo(
        256 + Math.cos(angulo_hora) * 100,
        256 + Math.sin(angulo_hora) * 100
    );
    contexto.stroke();
    
    // Center point
    contexto.fillStyle = "black";
    contexto.beginPath();
    contexto.arc(256, 256, 10, 0, Math.PI * 2);
    contexto.fill();


    // 3. Clear and Set Timeout for the next update
    clearTimeout(temporizador);
    temporizador = setTimeout(bucle, 1000);
}