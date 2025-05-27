const formLogin = document.getElementById('formLogin');
const formReserva = document.getElementById('formReserva');
const seccionReserva = document.querySelector('.reserva');

const usuarioGuardado = localStorage.getItem('usuario');
if (usuarioGuardado) {
  seccionReserva.style.display = 'block';
}

formLogin.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('usuario').value;
  const pass = document.getElementById('clave').value;
  localStorage.setItem('usuario', user);
  alert(`Bienvenido/a, ${user}`);
  seccionReserva.style.display = 'block';
  window.location.hash = '#reserva';
});

formReserva.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('¡Reserva realizada con éxito! Te enviaremos la info al correo.');
  formReserva.reset();
});
