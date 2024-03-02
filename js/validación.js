document
  .getElementById("formulario-pago")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("inputUsuario").value.trim();
    const passwordInput = document.getElementById("inputContraseña").value.trim();

    try {
      const url =
        "https://docs.google.com/spreadsheets/d/1SxB710239SBRKTRFBt39PoAvM6qchFNFjXUoBcVi0dU/export?format=csv";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Error al obtener los datos. Código de estado: " + response.status
        );
      }

      const data = await response.text();
      const filas = data.split("\n").map((row) => row.split(","));

      // Buscar si el usuario existe
      const filaUsuario = filas.find((fila) => fila[0].trim() === usernameInput);

      if (!filaUsuario) {
        // Usuario no encontrado
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El usuario no existe. Por favor regístrate o verifica el nombre.",
        });
      } else {
        // Usuario encontrado, validar contraseña
        const contraseñaCorrecta = filaUsuario[1].trim() === passwordInput;

        if (contraseñaCorrecta) {
          console.log("¡Acceso concedido! Redirigiendo...");
          window.location.href = "3-pago.html";
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Contraseña incorrecta. Inténtalo de nuevo.",
          });
        }
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al obtener los datos. Inténtalo más tarde.",
      });
    }
  });
