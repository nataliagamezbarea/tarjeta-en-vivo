$(document).ready(function () {
  $("#formulario-pago").submit(function (event) {
    event.preventDefault();
    SendFormGoogleSheets();
  });
});

function SendFormGoogleSheets() {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxQgm2_vVebY60ex6-RlBWkwA8G8wgES0I6b8M5VShe5heLQjjfH3ZGYeUm-b-n1otnlA/exec",
    type: "post",
    data: $("#formulario-pago").serializeArray(),
    success: function () {
      alert("Datos insertados correctamente");
    },
    error: function () {
      alert("Error en el Registro :(");
    },
  });
}
