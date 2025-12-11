# 🕰️ Reloj Analógico con Selector de Zona Horaria

Este es un proyecto web sencillo que implementa un reloj analógico utilizando HTML Canvas y JavaScript. Cuenta con un selector desplegable que permite al usuario mostrar la hora de varias zonas horarias globales principales, basándose en la precisa API `Intl.DateTimeFormat` del navegador para la conversión de la hora con reconocimiento del Horario de Verano (DST).

### 📁 Estructura del Proyecto

El proyecto se compone de tres archivos principales:
analog-clock-project/ 
├── index.html # La estructura HTML principal 
├── script.js # La lógica central de JavaScript para el dibujo y el cálculo del tiempo 
└── style.css # CSS para la presentación y el diseño  

### 🚀 Para Empezar

Para ejecutar este proyecto, simplemente abre el archivo `index.html` en cualquier navegador web moderno.

#### 📋 Requisitos

* Un navegador web moderno (Chrome, Firefox, Edge, Safari, etc.)
* No se requieren librerías ni servidores externos.

### ✨ Características

* **Pantalla Analógica en Tiempo Real:** Utiliza HTML Canvas para dibujar una esfera de reloj funcional con manecillas de hora, minuto y segundo.
* **Selección de Zona Horaria:** Un menú desplegable permite cambiar entre la **Hora Local**, **UTC** y otras 12 zonas horarias globales principales.
* **Manejo Preciso del Tiempo:** Las conversiones de zona horaria (incluidos los ajustes por Horario de Verano) se manejan con precisión utilizando la API nativa de JavaScript `Intl.DateTimeFormat`.
* **Diseño Adaptable (Responsive):** El lienzo del reloj está estilizado con CSS para ser adaptable a diferentes tamaños de pantalla.

### 💻 Detalles del Código

#### `index.html`

* Contiene el elemento `<canvas id="clockCanvas">` donde se dibuja el reloj.
* Contiene el elemento `<select id="timezone">` para el selector (combobox).
* El atributo `onchange="bucle()"` en el `<select>` activa una actualización inmediata del reloj cada vez que se selecciona una nueva zona horaria.

#### `script.js`

La función clave es `getTimeComponentsAccurate(timezone)`, que:
* Acepta una cadena de zona horaria (ej: `"Europe/London"`, `"UTC"`).
* Utiliza `new Intl.DateTimeFormat().formatToParts()` para calcular la hora, el minuto y el segundo precisos para esa zona horaria, manejando el DST automáticamente.
* La función `bucle()` es el *loop* principal que lee el valor seleccionado, obtiene la hora precisa y redibuja el reloj cada segundo.

#### `style.css`

* Centra el contenido en la página.
* Aplica un borde circular y un efecto de sombra al `<canvas>` para crear un marco de reloj visualmente atractivo.
* Asegura que el reloj sea adaptable utilizando unidades `vmin` para el tamaño.

### 🌐 Zonas Horarias Disponibles

| Nombre a Mostrar | Valor IANA |
| :--- | :--- |
| Hora Local (Configuración del Navegador) | `Local` |
| Tiempo Universal Coordinado | `UTC` |
| Nueva York (EST/EDT) | `America/New_York` |
| Los Ángeles (PST/PDT) | `America/Los_Angeles` |
| Londres (GMT/BST) | `Europe/London` |
| París (CET/CEST) | `Europe/Paris` |
| Moscú (MSK) | `Europe/Moscow` |
| Tokio (JST) | `Asia/Tokyo` |
| Shanghái (CST) | `Asia/Shanghai` |
| Dubái (GST) | `Asia/Dubai` |
| Calcuta (IST) | `Asia/Kolkata` |
| Sídney (AEST/AEDT) | `Australia/Sydney` |
| Johannesburgo (SAST) | `Africa/Johannesburg` |
| Auckland (NZST/NZDT) | `Pacific/Auckland` |

---

### 🔨 Próximos Pasos

Si deseas mejorar este proyecto, aquí tienes algunas ideas:

* **Visualización Digital:** Añadir un elemento para mostrar la hora en formato digital (ej: `12:30:45 PM`).
* **Estilismo:** Personalizar el diseño y la forma de las manecillas del reloj.