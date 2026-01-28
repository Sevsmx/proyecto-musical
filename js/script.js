// Esta función agrega la clase "active" cuando el usuario llega a una sección
// 1. ANIMACIÓN DE SCROLL (REVEAL)
function reveal() {
    // Buscamos todas las secciones que tengan la clase "reveal"
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight; // Tamaño de la ventana
        var elementTop = reveals[i].getBoundingClientRect().top; // Posición de la sección
        var elementVisible = 150; // Sensibilidad del scroll

        if (elementTop < windowHeight - elementVisible) {
            // Aquí es donde agregamos la palabra 'active' que el CSS está esperando
            reveals[i].classList.add("active");
        }
    }   
}

// Escuchamos cuando el usuario mueve el scroll
window.addEventListener("scroll", reveal);
reveal(); // Ejecutar al inicio

// FUNCIÓN MAESTRA PARA SLIDERS (Álbumes y Singles)
window.scrollSlider = function(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (slider) {
        const scrollAmount = 350; 
        slider.scrollBy({ 
            left: direction * scrollAmount, 
            behavior: 'smooth' 
        });
    } else {
        console.error("No se encontró el slider con ID:", sliderId);
    }
};

// 3. MANEJO DEL FORMULARIO (CONTACTO)
// Envíamos los datos a Formspree
var form = document.getElementById("contact-form");

if (form) { // Solo ejecuta si el formulario existe en pantalla
    async function handleSubmit(event) {
        event.preventDefault(); // Evita el salto de página

        // Crear el mensaje de estado y evitar el mensaje de esatdo si el usuario da clic varias veces
        var oldStatus = document.querySelector(".form-status");
        if(oldStatus) oldStatus.remove();

        var status = document.createElement("p");
        status.classList.add("form-status"); // Le daremos estilo en CSS

        var data = new FormData(event.target);

        // Enviar datos a Formspree
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {'Accept': 'application/json'}
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "¡Gracias! Mensaje enviado con éxito.";
                status.style.color = "#ffffff"
                status.style.marginTop = '15px';
                form.reset();
                form.appendChild(status);
            } else {
                status.innerHTML = "Oops! Hubo un problema.";
                status.style.color = "#ff4d4d"; // Rojo error
                form.appendChild(status);
            }
        }).catch(error => {
            status.innerHTML = "Oops! Hubo un problema al conectar.";
            status.style.color = "#ff4d4d"
            form.appendChild(status);
        });
    }
    form.addEventListener("submit", handleSubmit);
}

//Escuahmos el envío una sola vez
form.addEventListener("submit", handleSubmit);