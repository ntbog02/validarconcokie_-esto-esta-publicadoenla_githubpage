document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario automáticamente

    var dniInput = document.getElementById("dni").value;
    var contraseniaInput = document.getElementById("contrasenia").value;
    var url = "https://apiusuario-8c363-default-rtdb.firebaseio.com/registro.json";

    // Realizar la petición GET a la API para obtener los registros
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var registroEncontrado = false;
        var registroId;

        // Buscar el registro que coincida con el DNI y la contraseña ingresados
        for (var key in data) {
          if (data.hasOwnProperty(key) && data[key].dni === dniInput && data[key].contrasenia === contraseniaInput) {
            registroEncontrado = true;
            registroId = key;
            break;
          }
        }

        if (registroEncontrado) {
          // Guardar el ID del registro en el almacenamiento local
          localStorage.setItem("registroId", registroId);

          // Redirigir a alumnoscookies.html
          window.location.href = "alumnoscookies.html";
        } else {
          alert("Credenciales inválidas. Por favor, intenta nuevamente.");
        }
      })
      .catch(function(error) {
        alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
        console.error(error);
      });
  });