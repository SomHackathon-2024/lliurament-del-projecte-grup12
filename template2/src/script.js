// Seleccionamos el enlace
var enlaceCambiarImagen = document.getElementById('cambiarImagenBtn');

// Establecemos un estado inicial
var estado = 'sol';

// Agregamos un event listener para escuchar los clics en el enlace
enlaceCambiarImagen.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el enlace siga el href
    var imagen = enlaceCambiarImagen.querySelector('img');
    // Cambiamos entre el sol y la luna
    if (estado === 'sol') {
        document.body.style.backgroundImage = "url('https://w.forfun.com/fetch/fc/fc813e57424d1ad9576f9066812f670f.jpeg')"; // Cambia 'luna.jpg' por tu imagen de luna
        imagen.src = "sol2.webp";
        estado = 'luna';
    } else {
        document.body.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/previews/004/585/999/non_2x/blue-background-design-modern-and-clean-background-illustration-vector.jpg')"; // Cambia 'sol.jpg' por tu imagen de sol
        estado = 'sol';
        imagen.src = "luna.png";

    }
});

function inicio() {
    for (let k = 0; k <= 8; k++) {
        document.querySelector("#caja").innerHTML += `<div class="cuadro"><img src="https://catalunyaturisme.cat/wp-content/uploads/mataro-playa.jpg" alt=""></div>`;
        // document.querySelector("#caja").innerHTML += `<div class="cuadro">${k}</div>`;
    }

  }
  inicio()
  function open() {
    for (let k = 0; k <= 18; k++) {
        document.querySelector("#caja2").innerHTML += `<div class="cuadro2"><img src="https://i.ytimg.com/vi/wxnYbNP9-Zw/maxresdefault.jpg" alt="" height: 125px width: 150px></div>`;
        // document.querySelector("#caja").innerHTML += `<div class="cuadro">${k}</div>`;
    }

  }
  open()