class Organizacion {
    constructor(nombre, direccion, telefono, email, sitio, enMaps, recibe) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.sitio = sitio;
        this.enMaps = enMaps;
        this.recibe = recibe;
    }

    mostrarEnHTML() {
        return `
        <div class="resultado">
            <span class="org-name">${this.nombre}</span>
            <div class="divider"></div>
            <div class="data__container">
                <div class="data data-icon adress">
                    <i class="fa-solid fa-location-dot"></i>
                    <div class="data-adress">${this.direccion}<br>
                        <span class="gm-adress"><a href="${this.enMaps}" target="_blank" class="onMaps">Ver en Google Maps →</a></span>
                    </div>
                </div>
                <div class="data data-icon"><i class="fa-solid fa-phone"></i>${this.telefono}</div>
                <div class="data data-icon"><i class="fa-solid fa-at"></i>${this.email}</div>
                <div class="data">${this.sitio ? `<a href="https://${this.sitio}" target="_blank" class="website">${this.sitio}</a><br>` : ''}</div>
                <div class="data">
                    <span class="info">Recibe:</span> ${this.recibe.slice(0, 3).sort().join(', ')}
                    ${this.recibe.length > 3 ? ` y más.` : '.'}
                </div>
                <button class="adInfo" onclick="getDatosCompletos()">+ INFO</button>
            </div>
        </div>
      `;
    }
}

// Cargar el archivo JSON y procesar los datos
fetch('js/organizaciones.json')
    .then(response => response.json())
    .then(data => {
        const organizaciones = data.map(item => new Organizacion(
            item.nombre,
            item.direccion,
            item.telefono,
            item.email,
            item.sitio,
            item.enMaps,
            item.recibe
        ));

        const searchBox = document.querySelector('#search-box');
        const resultado = document.querySelector('.resultados');

        const filtrar = () => {
            const busqueda = searchBox.value.toLowerCase();
            resultado.innerHTML = '';

            for (const organizacion of organizaciones) {
                const datos = [organizacion.nombre, organizacion.direccion, organizacion.telefono, organizacion.email, organizacion.sitio, ...organizacion.recibe].join(' ');

                if (datos.toLowerCase().includes(busqueda)) {
                    resultado.innerHTML += organizacion.mostrarEnHTML();
                }
            }

            if (resultado.innerHTML === '') {
                document.getElementById('noRFound').style.display = "block";
            } else {
                document.getElementById('noRFound').style.display = "none";
            }
        };

        searchBox.addEventListener('keyup', filtrar);
        filtrar();
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            icon: 'error',
            html:
                'Hubo un error al cargar los archivos. Por favor, recarga la página e intentalo nuevamente.',
            allowOutsideClick: false,
            confirmButtonText: 'OK'
        });
    });


// Enviar formulario de reporte al hacer click en "Enviar Reporte"
function enviarReporte() {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre === '') {
        Swal.fire({
            icon: 'warning',
            text: 'Por favor, ingresa tu nombre',
            allowOutsideClick: false
        });
        nombreInput.focus();
        return;
    }

    if (email === '' || !emailPattern.test(email)) {
        Swal.fire({
            icon: 'warning',
            text: 'Por favor, ingresa un correo electrónico válido',
            allowOutsideClick: false
        });
        emailInput.focus();
        return;
    }

    if (mensaje === '') {
        Swal.fire({
            icon: 'warning',
            text: 'Por favor, ingresa un mensaje',
            allowOutsideClick: false
        });
        mensajeInput.focus();
        return;
    }

    const formReporte = document.getElementById('formReporte');
    const formData = new FormData(formReporte);

    fetch('https://formsubmit.co/02b0172da97107a82819e995ea77cfa4', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            Swal.fire({
                title: 'Listo! 🎉',
                icon: 'success',
                html:
                    'El reporte fue enviado con éxito.',
                allowOutsideClick: false,
                confirmButtonText: 'OK'
            })
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                html:
                    'Hubo un error al enviar el formulario. Por favor, recarga la página e intentalo nuevamente.',
                allowOutsideClick: false,
                confirmButtonText: 'OK'
            })
        });
}