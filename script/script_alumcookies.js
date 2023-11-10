// Obtener el ID del registro desde el almacenamiento local
var registroId = localStorage.getItem("registroId");

if (registroId) {
  // Obtener los datos del registro desde la API
  var registroUrl = "https://apiusuario-8c363-default-rtdb.firebaseio.com/registro/" + registroId + ".json";
  fetch(registroUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Obtener el nombre y apellido del registro
      var nombreApellido = data.nombreyapellido;

      // Mostrar el mensaje de bienvenida
      document.getElementById("bienvenido").textContent = "Bienvenido " + nombreApellido;

      // Obtener el curso del registro
      var curso = data.curso;

      // Obtener los datos del curso desde la API
      var cursosUrl = "https://cursos-76617-default-rtdb.firebaseio.com/cursos.json";
      fetch(cursosUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(cursosData) {
          // Buscar el curso que coincida con el nombre del curso del registro
          for (var key in cursosData) {
            if (cursosData.hasOwnProperty(key) && cursosData[key].nombrecurso === curso) {
              var cursoEncontrado = cursosData[key];
              // Mostrar los datos del curso
              mostrarDatosCurso(cursoEncontrado);
              break;
            }
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    })
    .catch(function(error) {
      console.error(error);
    });
} else {
  // Si no se encuentra el ID del registro en el almacenamiento local, redirigir a login.html
  window.location.href = "login.html";
}

function mostrarDatosCurso(curso) {
  var cursoContainer = document.createElement("div");
  cursoContainer.innerHTML = `
    <h2>${curso.nombrecurso}</h2>
    <img src="${curso.imagen}" alt="${curso.nombrecurso}">
    <p><strong>Presentación:</strong> ${curso.presentacion}</p>
    <p><strong>Objetivo General:</strong> ${curso.objetivogeneral}</p>
  `;
  document.body.appendChild(cursoContainer);
}
function cerrarSesion() {
      // Elimina el valor de "registroId" del almacenamiento local
      localStorage.removeItem("registroId");

      // Puedes redirigir al usuario a una página de inicio de sesión o realizar otras acciones de cierre de sesión si es necesario
      window.location.href = "login.html";
  }

 // Obtener el ID del registro desde la URL
 var urlParams = new URLSearchParams(window.location.search);
 var registroId = urlParams.get("id");

 // Generar la URL de profile.html con el ID del registro
 var profileUrl = "profile.html";

 // Obtener el botón de perfil y agregar el evento click
 var perfilButton = document.getElementById("perfilButton");
 perfilButton.addEventListener("click", function() {
   // Abrir "profile.html" en una ventana flotante
   window.open(profileUrl, "Perfil", "width=600,height=400");
 });