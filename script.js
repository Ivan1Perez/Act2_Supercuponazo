let numCartones;
let cantidadIntroducida = false;

console.log("BIENVENIDO AL SUPERCUPONAZO DE LA ONCE!");

console.log("¡Empecemos!");

console.log("¿Cuántos cuponazos quiere jugar?");
console.log("Pulse Enter para introducir una cantidad: ");
document.addEventListener("keydown", introdCantidad);

function introdCantidad(event) {
  let precio;

  if (event.key === "Enter") {
    document.removeEventListener("keydown", introdCantidad);

    // Comprobar si el valor ingresado es numérico
    do {
      numCartones = prompt("Introduzca una cantidad:");
      if (!isNaN(numCartones) && numCartones !== null) {
        console.log("De acuerdo, va a jugar " + numCartones + " cuponazos.");
        precio = calcularPrecio(numCartones);
        console.log("Serán un total de " + precio + "€.");
        console.log("Pulse Enter para continuar");
        document.addEventListener("keydown", generacionDeNumeros);
      } else {
        console.log(
          "Por favor, introduzca una cantidad válida (solo números)."
        );
      }
    } while (isNaN(numCartones) && numCartones !== null);
  } else {
    console.log("Por favor, ha de pulsar la tecla Enter para continuar.");
  }
}

function calcularPrecio(numCartones) {
  let cant = parseInt(numCartones);
  let precio = cant * 3;

  return precio;
}

function generacionDeNumeros(event) {
  if (event.key === "Enter") {
    document.removeEventListener("keydown", generacionDeNumeros);
    document.addEventListener("keydown", keydownHandlerNumberGenerationOption);
    console.log("Para generar número aleatoriamente pulse 1.");
    console.log("Para seleccionar los números de forma manual pulse 2.");
  } else {
    console.log("Por favor, ha de pulsar la tecla Enter para continuar.");
  }
}

let numerosSerie = new Array(2);
let numerosPrincipales = "";
let numerosSerieString = "";
let numerosPrincipalesString = "";
let randomNum;
let mensajeNumGenerado;

function keydownHandlerNumberGenerationOption(event) {
  if (event.key === "1" || event.key === "NumPad1") {
    generarNumAleatorio();
  } else if (event.key === "2" || event.key === "NumPad2") {
    generarNumPorSeleccion();
  }
}

/*---------------------INICIO GENERAR NÚMERO ALEATORIO--------------------------------------*/
function generarNumAleatorio() {
  document.removeEventListener("keydown", keydownHandlerNumberGenerationOption);

  mensajeNumGenerado = "El número generado es: ";
  for (let i = 0; i < 3; i++) {
    randomNum = Math.floor(Math.random() * 10);
    numerosSerie[i] = randomNum;
    numerosSerieString += randomNum.toString();
  }

  for (let i = 0; i < 5; i++) {
    randomNum = Math.floor(Math.random() * 10);
    numerosPrincipales[i] = randomNum;
    numerosPrincipalesString += randomNum.toString();
  }

  console.log(
    mensajeNumGenerado + numerosSerieString + " " + numerosPrincipalesString
  );
}
/*---------------------FIN GENERAR NÚMERO ALEATORIO--------------------------------------*/

/*---------------------INICIO GENERAR NÚMERO POR SELECCIÓN--------------------------------------*/
function generarNumPorSeleccion() {
  document.removeEventListener("keydown", keydownHandlerNumberGenerationOption);

  console.log("Ha elegido la selección manual.");

  console.log("Introduzca los 3 números pertenecientes a la serie:");

  document.addEventListener("keydown", keydownPickingNumbers);
}
/*---------------------FIN GENERAR NÚMERO POR SELECCIÓN--------------------------------------*/

let numeros = new Array(10);
for (let i = 0; i < numeros.length; i++) {
  numeros[i] = i;
}

let numerosSeriePorSeleccion = new Array();
let numerosPrincipalesPorSeleccion = new Array();
let numerosObtenidos;
let numSerieCompletado = false;
let numeroSerie;
let numeroPrincipal;

function keydownPickingNumbers(event) {
  let numIndice = numeros.indexOf(parseInt(event.key)); //Obtendrá la posición del array donde se encuentra el mismo "key" de la tecla pulsada. Si esta no correstponde a ningún número nos dará -1.

  if (!numSerieCompletado) {
    selectNumSerie(event, numIndice);
  } else {
    selectNumNormales(event, numIndice);
  }
}

function selectNumSerie(event, numIndice) {
  if (numerosSeriePorSeleccion.length < 3) {
    if (
      //Si la tecla pulsada coincide con uno de los números del array (en este caso, su índice) la condición será cierta. Habrá encontrado el número.
      event.key === numIndice.toString() ||
      event.key === "NumPad" + numIndice.toString()
    ) {
      numerosSeriePorSeleccion.push(numIndice);
      numerosObtenidos = obtenerNumeros(numerosSeriePorSeleccion);
      numeroSerie = numerosObtenidos;
      console.log(numerosObtenidos);
    } else {
      console.log(
        "La tecla seleccionada no es un número.\n" +
          "Inserte un número, por favor."
      );
    }
  }

  if (numerosSeriePorSeleccion.length === 3) {
    console.log("Serie generada correctamente.");
    console.log("Número de serie: " + numerosObtenidos);
    console.log("Introduzca ahora los 5 números principales:");
    numSerieCompletado = true;
  }
}

function selectNumNormales(event, numIndice) {
  if (numerosPrincipalesPorSeleccion.length < 5) {
    if (
      //Si la tecla pulsada coincide con uno de los números del array (en este caso, su índice) la condición será cierta. Habrá encontrado el número.
      event.key === numIndice.toString() ||
      event.key === "NumPad" + numIndice.toString()
    ) {
      numerosPrincipalesPorSeleccion.push(numIndice);
      numerosObtenidos = obtenerNumeros(numerosPrincipalesPorSeleccion);
      numeroPrincipal = numerosObtenidos;
      console.log(numerosObtenidos);
    } else {
      console.log(
        "La tecla seleccionada no es un número.\n" +
          "Inserte un número, por favor."
      );
    }
  }

  if (numerosPrincipalesPorSeleccion.length === 5) {
    document.removeEventListener("keydown", keydownPickingNumbers);
    console.log("Numeros principales generados correctamente.");
    console.log("Número principal: " + numerosObtenidos);
    console.log(
      "Su número de completo del cuponazo es el [" +
        numeroSerie +
        " " +
        numeroPrincipal +
        "]"
    );
  }
}

function obtenerNumeros(numerosObtenidos) {
  let numerosString = "";
  for (let i in numerosObtenidos) {
    numerosString += numerosObtenidos[i];
  }

  return numerosString;
}

/*----------------------------FIN GENERACIÓN NÚMEROS-------------------------------------*/
