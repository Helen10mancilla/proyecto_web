const formLogin = document.getElementById('formLogin');
const formReserva = document.getElementById('formReserva');
const seccionReserva = document.querySelector('.reserva');
const btnLoginHeader = document.getElementById('btnLoginHeader');
const listaReservas = document.getElementById('listaReservas');

let usuarioGuardado = localStorage.getItem('usuario');
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Función para mostrar reservas
function mostrarReservas() {
  listaReservas.innerHTML = '';
  reservas.forEach((reserva, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${reserva.nombre}</strong> - ${reserva.destino} (${reserva.fechaInicio} a ${reserva.fechaFin})</span>
      <div>
        <button onclick="editarReserva(${index})">Editar</button>
        <button onclick="eliminarReserva(${index})">Eliminar</button>
      </div>
    `;
    listaReservas.appendChild(li);
  });
}

// Mostrar reserva si usuario ya está logueado
if (usuarioGuardado) {
  seccionReserva.style.display = 'block';
  btnLoginHeader.style.display = 'none';
  mostrarReservas();
} else {
  seccionReserva.style.display = 'none';
  btnLoginHeader.style.display = 'inline-block';
}

// Mostrar el formulario login cuando se presiona el botón del header
btnLoginHeader.addEventListener('click', () => {
  window.location.hash = '#login';
});

// Manejo del login
formLogin.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('usuario').value.trim();
  const pass = document.getElementById('clave').value.trim();

  if (user && pass) {
    localStorage.setItem('usuario', user);
    usuarioGuardado = user;
    alert(`Bienvenido/a, ${user}!`);
    seccionReserva.style.display = 'block';
    btnLoginHeader.style.display = 'none';
    window.location.hash = '#reserva';
    mostrarReservas();
    formLogin.reset();
  } else {
    alert('Por favor ingresa usuario y contraseña.');
  }
});

// Manejo del formulario de reserva
formReserva.addEventListener('submit', function(e) {
  e.preventDefault();

  if (!usuarioGuardado) {
    alert('Debes iniciar sesión para hacer una reserva.');
    window.location.hash = '#login';
    return;
  }

  // Obtener valores
  const nombre = document.getElementById('nombreReserva').value.trim();
  const email = document.getElementById('emailReserva').value.trim();
  const destino = document.getElementById('destinoReserva').value;
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;

  if (!nombre || !email || !destino || !fechaInicio || !fechaFin) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Agregar reserva
  reservas.push({ nombre, email, destino, fechaInicio, fechaFin });
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarReservas();

  alert('¡Reserva realizada con éxito!');
  formReserva.reset();
});

// Función para eliminar reserva
window.eliminarReserva = function(index) {
  if (confirm('¿Quieres eliminar esta reserva?')) {
    reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    mostrarReservas();
  }
};

// Función para editar reserva (simple: carga datos en formulario para editar)
window.editarReserva = function(index) {
  const reserva = reservas[index];
  document.getElementById('nombreReserva').value = reserva.nombre;
  document.getElementById('emailReserva').value = reserva.email;
  document.getElementById('destinoReserva').value = reserva.destino;
  document.getElementById('fechaInicio').value = reserva.fechaInicio;
  document.getElementById('fechaFin').value = reserva.fechaFin;

  // Eliminar la reserva vieja para no duplicar
  reservas.splice(index, 1);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarReservas();

  // Scroll hacia el formulario para que el usuario vea lo que edita
  window.location.hash = '#reserva';
};
