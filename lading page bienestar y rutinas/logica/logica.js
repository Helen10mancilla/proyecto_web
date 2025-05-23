// Alternar modo oscuro (opcional)
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Mostrar el contenido principal de la página (landing)
function mostrarLanding() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("usuarioLogueado");
  location.reload();
}

// Código que se ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const estaLogueado = localStorage.getItem("usuarioLogueado");

  // Si ya hay una sesión iniciada, mostrar directamente la landing
  if (estaLogueado) {
    mostrarLanding();
  }

  const form = document.getElementById("auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("login-msg");

  // Manejo del formulario de login/registro
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Obtener los usuarios guardados en localStorage o iniciar con objeto vacío
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Validar login o hacer registro
    if (users[email]) {
      // Usuario ya existe, intentar login
      if (users[email] === password) {
        msg.textContent = "¡Inicio de sesión exitoso!";
        msg.style.color = "green";
        localStorage.setItem("usuarioLogueado", true);
        setTimeout(mostrarLanding, 1000);
      } else {
        msg.textContent = "Contraseña incorrecta.";
        msg.style.color = "red";
      }
    } else {
      // Registrar nuevo usuario
      users[email] = password;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("usuarioLogueado", true);
      msg.textContent = "¡Usuario registrado exitosamente!";
      msg.style.color = "green";
      setTimeout(mostrarLanding, 1000);
    }
  });
});
