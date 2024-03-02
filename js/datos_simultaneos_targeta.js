let cardholderNameInput, cardNumberInput, expiryDateInput, cvvInput;
let fechaVencimientoCambiada = false;
let fechaVencimientoInicial = "";
let svgDoc = null;
let intentos = 0;

// Función para inicializar el SVG
function inicializarSVG() {
  const objectElement = document.getElementById('tarjetaSVG');
  
  if (objectElement && intentos < 50) {
    try {
      svgDoc = objectElement.contentDocument;
      
      if (svgDoc) {
        console.log('✓ SVG cargado correctamente');
        mostrarDatos(); // Actualizar con datos iniciales
        return true;
      }
    } catch (e) {
      console.error('Error accediendo al SVG:', e);
    }
  }
  
  // Reintentar si no se cargó (máximo 5 segundos)
  if (intentos < 50) {
    intentos++;
    setTimeout(inicializarSVG, 100);
  } else {
    console.error('No se pudo cargar el SVG después de varios intentos');
  }
}

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  cardholderNameInput = document.getElementById("cardholderName");
  cardNumberInput = document.getElementById("cardNumber");
  expiryDateInput = document.getElementById("expiryDate");
  cvvInput = document.getElementById("cvv");
  
  fechaVencimientoInicial = expiryDateInput.value;
  
  // Inicializar SVG después de un pequeño delay
  setTimeout(inicializarSVG, 100);
  
  // Event listeners
  if (cardholderNameInput) {
    cardholderNameInput.addEventListener("input", mostrarDatos);
  }
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", mostrarDatos);
  }
  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", () => {
      fechaVencimientoCambiada = expiryDateInput.value !== fechaVencimientoInicial;
      mostrarDatos();
    });
  }
  if (cvvInput) {
    cvvInput.addEventListener("input", mostrarDatos);
  }
});

function mostrarDatos() {
  if (!svgDoc) {
    console.log('⚠ SVG aún no está disponible');
    return;
  }
  
  if (!cardholderNameInput) return;
  
  // Obtener valores con límites de caracteres
  const nombreTarjeta = cardholderNameInput.value.substring(0, 22).toUpperCase();
  const numeroTarjeta = formatearNumeroTarjeta(cardNumberInput.value);
  const fechaVencimiento = fechaVencimientoCambiada
    ? formatDate(expiryDateInput.value)
    : "";
  const cvv = cvvInput.value.substring(0, 4);

  // Actualizar textos en el SVG (vacíos si no hay datos)
  actualizarTextoSVG('nombreTarjeta', nombreTarjeta);
  actualizarTextoSVG('numeroTarjeta', numeroTarjeta);
  actualizarTextoSVG('fechaVencimiento', fechaVencimiento);
  actualizarTextoSVG('cvvTarjeta', cvv);
}

function actualizarTextoSVG(elementId, texto) {
  if (!svgDoc) return;
  
  const textElement = svgDoc.getElementById(elementId);
  if (textElement) {
    const tspan = textElement.querySelector('tspan');
    if (tspan) {
      tspan.textContent = texto;
    } else {
      console.warn(`No se encontró tspan en ${elementId}`);
    }
  } else {
    console.warn(`No se encontró elemento ${elementId} en SVG`);
  }
}

function formatearNumeroTarjeta(numero) {
  // Eliminar espacios y limitar a 19 dígitos
  const soloNumeros = numero.replace(/\s/g, '').substring(0, 19);
  // Dividir en grupos de 4
  return soloNumeros.match(/.{1,4}/g)?.join(' ') || '';
}

function formatDate(inputDate) {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
