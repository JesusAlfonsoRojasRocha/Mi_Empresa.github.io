document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('contactForm');
    const divResultado = document.getElementById('resultado');

    function validarNombre(nombre) {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/;
        return regex.test(nombre);
    }

    function validarTelefono(telefono) {
        const regex = /^\d{7,15}$/;
        return regex.test(telefono);
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarComentario(comentario) {
        return comentario.trim().length >= 5;
    }

    function mostrarNota(datos) {
        divResultado.innerHTML = `
            <div class="nota">
                <h4>Consulta guardada:</h4>
                <p><strong>Nombre:</strong> ${datos.nombre}</p>
                <p><strong>Teléfono:</strong> ${datos.telefono}</p>
                <p><strong>Correo:</strong> ${datos.email}</p>
                <p><strong>Comentario:</strong> ${datos.comentario}</p>
                <small>Guardado el: ${new Date().toLocaleString()}</small>
            </div>
        `;
    }

    function limpiarFormulario() {
        document.getElementById('nombre').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('email').value = '';
        document.getElementById('comentario').value = '';
    }

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const comentario = document.getElementById('comentario').value.trim();

        let errores = [];

        if (!validarNombre(nombre)) {
            errores.push('El nombre debe tener al menos 2 letras (solo letras y espacios).');
        }

        if (!validarTelefono(telefono)) {
            errores.push('El teléfono debe contener solo números y tener entre 7 y 15 dígitos.');
        }

        if (!validarEmail(email)) {
            errores.push('El correo electrónico no es válido. Debe tener @ y un dominio (ej: nombre@dominio.com).');
        }

        if (!validarComentario(comentario)) {
            errores.push('El comentario debe tener al menos 5 caracteres.');
        }

        if (errores.length > 0) {
            divResultado.innerHTML = `
                <div class="error">
                    <strong>Errores en el formulario:</strong>
                    <ul>${errores.map(e => `<li>${e}</li>`).join('')}</ul>
                </div>
            `;
            return;
        }

        const datosUsuario = {
            nombre: nombre,
            telefono: telefono,
            email: email,
            comentario: comentario
        };

        mostrarNota(datosUsuario);
        limpiarFormulario();
    });
});