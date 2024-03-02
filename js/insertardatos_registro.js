$(document).ready(function () {
  $("#formulario-pago").submit(function (event) {
    event.preventDefault();
    SendFormGoogleAppsScript();
  });
});

function SendFormGoogleAppsScript() {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbyfWjUwe76bllER729Ik2gh6HbJtTPJ78n6I_SQ5hq93TU10PbEXSivI50zsvEsZvDvtA/exec",
    type: "post",
    data: $("#formulario-pago").serialize(),
    dataType: "json", // Asegura que la respuesta se interprete como JSON
    success: function (response) {
      // Si la respuesta viene como string, convertirla a objeto
      if (typeof response === "string") {
        response = JSON.parse(response);
      }

      if (response.result === "error") {
        swal("¡Error!", response.error || "Ha ocurrido un problema.", "error");
      } else if (response.result === "success") {
        swal("¡Éxito!", "Registro exitoso (Fila: " + response.row + ")", "success");
        $("#formulario-pago")[0].reset(); // Limpiar formulario después de enviar
      } else {
        swal("¡Aviso!", "Respuesta inesperada del servidor.", "warning");
      }
    },
    error: function () {
      swal("¡Error!", "No se pudo conectar con el servidor.", "error");
    },
  });
}
