/*Este es el código de un Tamagotchi sensible a a la comida y al sueño. Si no se alimenta o duerme, se pone 
hambriento o cansado, y si no se hace nada tras 3 días, muere.*/

let estado = "normal";
let diasSinComida = 0;
let diasSinSueno = 0;

// Función para ALIMENTAR al Tamagotchi
function alimentar() {
  estado = "alimentado";
  diasSinComida = 0;
  actualizarBarras();
  document.getElementById("tamagotchi").src = "img/tamagotchi-fed.jpg";
  document.getElementById("dias").textContent = `Días desde la última comida: ${diasSinComida}`;
}

// Función para poner a DORMIR al Tamagotchi
function dormir() {
  estado = "dormido";
  diasSinSueno = 0;
  actualizarBarras();
  document.getElementById("tamagotchi").src = "img/tamagotchi-sleep.jpg";
}

// Función para ACTUALIZAR el ESTADO del Tamagotchi
function actualizarEstado() {
  if (estado === "normal") {
    diasSinComida++;
    diasSinSueno++;
    actualizarBarras();
    document.getElementById("dias").textContent = `Días desde la última comida: ${diasSinComida}`;
    if (diasSinComida >= 3 || diasSinSueno >= 3) {
      estado = "muerto";
      document.getElementById("tamagotchi").src = "img/tamagotchi-dead.jpg";
    } else if (diasSinComida >= 1 || diasSinSueno >= 1) {
      if (diasSinSueno >= 1) {
        estado = "somnoliento";
        document.getElementById("tamagotchi").src = "img/tamagotchi-sleepy.jpg";
      } else {
        estado = "hambriento";
        document.getElementById("tamagotchi").src = "img/tamagotchi-hungry.jpg";
      }
    }
  }
}

// Función para actualizar el estado cada día
setInterval(actualizarEstado, 1000 * 60 * 60 * 24); // Esos número significan 24 horas

// Función para ACTUALIZAR las BARRAS de comida, sueño y salud
function actualizarBarras() {
  const barraComida = document.getElementById("comida");
  const barraSueno = document.getElementById("sueno");
  const barraSalud = document.getElementById("salud");

  const porcentajeComida = 100 - diasSinComida * 33.33; // 1 día sin comida reduce un tercio de la comida
  const porcentajeSueno = 100 - diasSinSueno * 33.33; // 1 día sin sueño reduce un tercio del sueño

  // Función para CALCULAR la SALUD basada en la comida y el sueño
  const porcentajeSalud = (porcentajeComida + porcentajeSueno) / 2; // La salud es el promedio de la comida y el sueño

  barraComida.style.width = `${porcentajeComida}%`;
  barraSueno.style.width = `${porcentajeSueno}%`;
  barraSalud.style.width = `${porcentajeSalud}%`;
}
