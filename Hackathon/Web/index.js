// Event listener para abrir y cerrar el cuadro negro con el botón
document.getElementById('toggleButton').addEventListener('click', function(event) {
    var drawer = document.getElementById('imageDrawer');
    drawer.classList.toggle('active'); // Alternar la clase 'active' para abrir o cerrar el cuadro negro
    event.stopPropagation(); // Evitar que el clic se propague y active el cierre automático
});

// Event listener para cerrar el cuadro negro automáticamente al hacer clic fuera de él
document.addEventListener('click', function(event) {
    var drawer = document.getElementById('imageDrawer');
    // Verificar si el clic ocurrió fuera del cuadro negro y si el cuadro está activo
    if (!drawer.contains(event.target) && drawer.classList.contains('active')) {
        drawer.classList.remove('active'); // Cerrar el cuadro negro
    }
});

// Event listener para cerrar el cuadro negro cuando se hace clic en el mapa
document.querySelector('.map-container').addEventListener('click', function(event) {
    var drawer = document.getElementById('imageDrawer');
    drawer.classList.remove('active'); // Cerrar el cuadro negro
    event.stopPropagation(); // Evitar que el clic se propague y active el cierre automático
});

// Event listener para cerrar el cuadro negro cuando se hace clic en la cruz
document.getElementById('closeButton').addEventListener('click', function(event) {
    var drawer = document.getElementById('imageDrawer');
    drawer.classList.remove('active'); // Cerrar el cuadro negro
    event.stopPropagation(); // Evitar que el clic se propague y active el cierre automático
});


document.getElementById('add-button').addEventListener('click', function() {
    const container = document.getElementById('grid-container');
    const newElement = document.createElement('div');
    newElement.classList.add('map-button');

    // Personaliza el contenido de cada elemento aquí
    const img = document.createElement('img');
    img.src = "ruta/a/tu/imagen.jpg"; // Ruta de la imagen
    const span = document.createElement('span');
    span.textContent = "Texto del elemento"; // Texto del elemento

    newElement.appendChild(img);
    newElement.appendChild(span);

    container.appendChild(newElement);
});

// Event listener para eliminar el último cuadro al hacer clic en el botón
document.getElementById('remove-button').addEventListener('click', function() {
    const container = document.getElementById('grid-container');
    const lastElement = container.lastElementChild;
    if (lastElement) {
        container.removeChild(lastElement);
    }
});
