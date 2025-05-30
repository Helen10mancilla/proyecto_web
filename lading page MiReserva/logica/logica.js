const formLogin = document.getElementById('formLogin');
const formReserva = document.getElementById('formReserva');
const seccionReserva = document.querySelector('.reserva');

const usuarioGuardado = localStorage.getItem('usuario');
if (usuarioGuardado) {
  seccionReserva.style.display = 'block';
}



formReserva.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('¡Reserva realizada con éxito! Te enviaremos la info al correo.');
  formReserva.reset();
});
