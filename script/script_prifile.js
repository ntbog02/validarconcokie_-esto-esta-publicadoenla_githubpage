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
      // Crear un objeto de perfil sin la contraseña
      var perfil = {
        nombreyapellido: data.nombreyapellido,
        dni: data.dni,
        email: data.mail,
        curso: data.curso
      };

      // Mostrar los datos del perfil
      mostrarDatosPerfil(perfil);
    })
    .catch(function(error) {
      console.error(error);
    });
} else {
  // Si no se encuentra el ID del registro en el almacenamiento local, redirigir a login.html
  window.location.href = "login.html";
}

function mostrarDatosPerfil(perfil) {
  var perfilContainer = document.getElementById("perfilContainer");

  var ul = document.createElement("ul");
  for (var key in perfil) {
    var li = document.createElement("li");
    li.textContent = key + ": " + perfil[key];
    ul.appendChild(li);
  }

  perfilContainer.appendChild(ul);

}
