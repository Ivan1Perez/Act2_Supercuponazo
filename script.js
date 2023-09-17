let numCuponazos;
let numerosTotales = new Array();

let cantidadIntroducida = false;

console.log("BIENVENIDO AL SUPERCUPONAZO DE LA ONCE!");

console.log("¡Empecemos!");

console.log("¿Cuántos cuponazos quiere jugar?");
console.log("Pulse Enter para introducir una cantidad: ");
document.addEventListener("keydown", introdCantidad);

function introdCantidad(event) {
  let precio;
  let completado = false;

  if (event.key === "Enter") {
    document.removeEventListener("keydown", introdCantidad);

    // Comprobar si el valor ingresado es numérico
    do {
      numCuponazos = prompt("Introduzca una cantidad:");
      if (!isNaN(numCuponazos) && numCuponazos !== null) {
        console.log("De acuerdo, va a jugar " + numCuponazos + " cuponazos.");
        precio = calcularPrecio(numCuponazos);
        console.log("Serán un total de " + precio + "€.");
        console.log(
          "Pulse Enter para proceder a elegir los números " +
            "(0/" +
            numCuponazos +
            "):"
        );
        document.addEventListener("keydown", generacionDeNumeros);
      } else {
        console.log(
          "Por favor, introduzca una cantidad válida (solo números)."
        );
      }
    } while (isNaN(numCuponazos) && numCuponazos !== null);
  } else {
    console.log("Por favor, ha de pulsar la tecla Enter para continuar.");
  }
}

function calcularPrecio(numCuponazos) {
  let cant = parseInt(numCuponazos);
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

function keydownHandlerNumberGenerationOption(event) {
  if (event.key === "1" || event.key === "NumPad1") {
    generarNumAleatorio();
  } else if (event.key === "2" || event.key === "NumPad2") {
    generarNumPorSeleccion();
  }
}

/*---------------------INICIO GENERAR NÚMERO ALEATORIO--------------------------------------*/
function generarNumAleatorio() {
  let numerosSerie = new Array(2);
  let numerosSerieString = "";
  let numerosPrincipales = new Array(4);
  let numerosPrincipalesString = "";
  let randomNum;
  let mensajeNumGenerado;

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

  numerosTotales.push(numerosSerieString + " " + numerosPrincipalesString);
  console.log("Tus números: ");
  for (let i in numerosTotales) {
    console.log(numerosTotales[i]);
  }

  if (numerosTotales.length < parseInt(numCuponazos)) {
    procederSiguienteNumero();
  }
}
/*---------------------FIN GENERAR NÚMERO ALEATORIO--------------------------------------*/

/*---------------------INICIO GENERAR NÚMERO POR SELECCIÓN--------------------------------------*/
function generarNumPorSeleccion() {
  document.removeEventListener("keydown", keydownHandlerNumberGenerationOption);

  console.log("Ha elegido la selección manual.");

  console.log("Introduzca los 3 números pertenecientes a la serie:");

  document.addEventListener("keydown", keydownPickingNumbers);
}

/*---------------------------------INICIO SELECCIÓN DE NÚMERO---------------------------------------------*/
let numeros = new Array(10);
for (let i = 0; i < numeros.length; i++) {
  numeros[i] = i;
}

let numeroSerie;
let numerosSeriePorSeleccion = new Array();
let numerosPrincipalesPorSeleccion = new Array();
let numerosObtenidos;
let numSerieCompletado = false;

function keydownPickingNumbers(event) {
  let numIndice = numeros.indexOf(parseInt(event.key)); //Obtendrá la posición del array donde se encuentra el mismo "key" de la tecla pulsada. Si esta no correstponde a ningún número nos dará -1.

  if (!numSerieCompletado) {
    selectNumSerie(event, numIndice);
  } else {
    selectNumNormales(event, numIndice, numeroSerie);
  }
}

function selectNumSerie(event, numIndice) {
  numeroSerie = "";

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

function selectNumNormales(event, numIndice, numeroSerie) {
  let numeroPrincipal;

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
    numSerieCompletado = false;
    console.log("Numeros principales generados correctamente.");
    console.log("Número principal: " + numerosObtenidos);
    console.log(
      "Su número completo del cuponazo es el [" +
        numeroSerie +
        " " +
        numeroPrincipal +
        "]"
    );
    numerosTotales.push(numeroSerie + " " + numeroPrincipal);
    console.log("Tus números: ");
    for (let i in numerosTotales) {
      console.log(numerosTotales[i]);
    }
    numerosSeriePorSeleccion = new Array();
    numerosPrincipalesPorSeleccion = new Array();
    if (numerosTotales.length < parseInt(numCuponazos)) {
      procederSiguienteNumero();
    }
  }
}

function obtenerNumeros(numerosObtenidos) {
  let numerosString = "";
  for (let i in numerosObtenidos) {
    numerosString += numerosObtenidos[i];
  }

  return numerosString;
}

/*---------------------FIN GENERAR NÚMERO POR SELECCIÓN--------------------------------------*/

function procederSiguienteNumero() {
  let msjFormaAleatoria =
    "- Introduzca 's' para generar el siguiente número de forma aleatoria.";
  let msjFormalManual =
    "- Introduzca 'm' para seleccionar el siguiente número de forma manual.";
  let msjNumCompletados =
    "Números completados: (" + numerosTotales.length + "/" + numCuponazos + ")";
  let introTeclado = prompt(
    "Opciones:\n" +
      msjFormaAleatoria +
      "\n" +
      msjFormalManual +
      "\n" +
      msjNumCompletados
  );

  do {
    if (introTeclado === "s") {
      generarNumAleatorio();
    } else if (introTeclado === "m") {
      generarNumPorSeleccion();
    } else {
      introTeclado = prompt(
        "Error. Por favor, introduzca 's' o 'm' para generar el siguiente número (" +
          numerosTotales.length +
          "/" +
          numCuponazos +
          ")"
      );
      if (introTeclado === "s") {
        generarNumAleatorio();
      } else if (introTeclado === "m") {
        generarNumPorSeleccion();
      }
    }
  } while (introTeclado !== "s" && introTeclado !== "m");
}

/*----------------------------FIN GENERACIÓN NÚMEROS-------------------------------------*/
