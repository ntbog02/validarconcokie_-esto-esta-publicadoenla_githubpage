document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario automáticamente

    var dniInput = document.getElementById("dni").value;
    var url = "https://api02proyect-default-rtdb.firebaseio.com/registro.json";

    // Realizar la petición GET a la API para verificar el DNI
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Verificar si el DNI existe en algún registro
        var dniExiste = false;
        for (var key in data) {
          if (data.hasOwnProperty(key) && data[key].dni === dniInput) {
            dniExiste = true;
            break;
          }
        }

        if (dniExiste) {
          alert("El número de DNI ya existe en un registro.");
          // Redirigir al usuario a login.html
          window.location.href = "login.html";
        } else {
          // Habilitar el formulario de carga de datos
          document.getElementById("registroForm").innerHTML = `
            <label for="nombreyapellido" class="col-form-label">Nombre y Apellido:</label>
            <input type="text" id="nombreyapellido" class="form-control" required>
            <label for="mail" class="col-form-label">Email:</label>
            <input type="email" id="mail" class="form-control" required>
            <label for="curso" class="col-form-label">Curso:</label>
            <select id="curso" class="form-control" required>
              <option value="Front End Developer">Front End Developer</option>
              <option value="Back End Developer">Back End Developer</option>
              <option value="Python 3">Python 3</option>
            </select>
            <label for="contrasenia" class="col-form-label">Contraseña:</label>
            <input type="password" id="contrasenia" class="form-control" required>
            <input type="submit" class="btn btn-primary" value="Registrar">
          `;

          // Agregar el evento de envío del formulario de registro
          document.getElementById("registroForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Evitar que se envíe el formulario automáticamente

            var datos = {
              dni: dniInput,
              nombreyapellido: document.getElementById("nombreyapellido").value,
              mail: document.getElementById("mail").value,
              curso: document.getElementById("curso").value,
              contrasenia: document.getElementById("contrasenia").value
            };

            // Realizar la petición POST a la API para guardar los datos de registro
            fetch(url, {
              method: "POST",
              body: JSON.stringify(datos)
            })
            .then(function(response) {
              alert("Registro exitoso!");
              // Restablecer el formulario
              document.getElementById("registroForm").reset();

              // Redirigir al usuario a login.html
              window.location.href = "login.html";
            })
            .catch(function(error) {
              alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
              console.error(error);
            });
          });
        }


        
      })
      .catch(function(error) {
        alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
        console.error(error);
      });
  });