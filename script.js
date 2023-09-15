console.log("Para generar número aleatoriamente pulse 1.");

console.log("Para seleccionar los números de forma manual pulse 2.");

let numerosSerie = new Array(2);
let numerosPrincipales = "";
let numerosSerieString = "";
let numerosPrincipalesString = "";
let randomNum;
let mensajeNumGenerado;
let opcionGenerarNumPulsada = false;

document.addEventListener("keydown", function (event) {
  if (!opcionGenerarNumPulsada) {
    if (event.key === "1" || event.key === "NumPad1") {
      generarNumAleatorio();
    } else if (event.key === "2" || event.key === "NumPad2") {
      generarNumPorSeleccion();
    }
  }
});

/*---------------------INICIO GENERAR NÚMERO ALEATORIO--------------------------------------*/
function generarNumAleatorio() {
  opcionGenerarNumPulsada = true;

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
  let numeros = new Array(10);
  let index = 0;

  opcionGenerarNumPulsada = true;
  console.log("Ha elegido la selección manual.");
  console.log("Introduzca los 3 números pertenecientes a la serie:");

  for (let i = 0; i < numeros.length; i++) {
    numeros[i] = i;
  }

  /*Tenemos o bien que cerrar el addEventListener("keydowm") anterior e instaurar uno nuevo en esta parte 
  o bien hacer que se detecte un nuevo eventListener a base de booleanos sobre los número que introduzca 
  el usuario.*/
  if (
    event.key === index.toString() ||
    event.key === "NumPad" + index.toString()
  ) {
    console.log(index);
  }
}
/*---------------------FIN GENERAR NÚMERO POR SELECCIÓN--------------------------------------*/
