const cardholderNameInput = document.getElementById("cardholderName");
const cardNumberInput = document.getElementById("cardNumber");
const expiryDateInput = document.getElementById("expiryDate");
const cvvInput = document.getElementById("cvv");
const datosIngresadosDiv = document.getElementById("datosIngresados");

let fechaVencimientoCambiada = false;
let fechaVencimientoInicial = "";

cardholderNameInput.addEventListener("input", mostrarDatos);
cardNumberInput.addEventListener("input", mostrarDatos);
expiryDateInput.addEventListener("input", () => {
  fechaVencimientoCambiada = expiryDateInput.value !== fechaVencimientoInicial;
  mostrarDatos();
});
cvvInput.addEventListener("input", mostrarDatos);

function mostrarDatos() {
  const nombreTarjeta = cardholderNameInput.value;
  const numeroTarjeta = cardNumberInput.value;
  const fechaVencimiento = fechaVencimientoCambiada
    ? formatDate(expiryDateInput.value)
    : "";
  const cvv = cvvInput.value;

  const campos = {
    "Nombre de la Tarjeta": nombreTarjeta,
    "Número de Tarjeta": numeroTarjeta,
    "Fecha de Vencimiento y CVV": `${fechaVencimiento}${Array(68)
      .fill(String.fromCharCode(160))
      .join("")}${cvv}`,
  };

  let contenidoHTML = "";

  for (const campo in campos) {
    let valorCampo = campos[campo] || "&nbsp;"; // Si el campo está vacío, se asigna un espacio en blanco
    contenidoHTML += `<p id="${campo.replace(/\s+/g, "-")}">${valorCampo}</p>`;
  }

  datosIngresadosDiv.innerHTML = contenidoHTML;
  actualizarEstilosVacios();
}

function actualizarEstilosVacios() {
  const parrafos = datosIngresadosDiv.getElementsByTagName("p");
  for (let i = 0; i < parrafos.length; i++) {
    if (parrafos[i].textContent.trim() === "") {
      parrafos[i].classList.add("campo-vacio");
    } else {
      parrafos[i].classList.remove("campo-vacio");
    }
  }
}

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

document.addEventListener("DOMContentLoaded", () => {
  fechaVencimientoInicial = expiryDateInput.value;
});
