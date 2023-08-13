// Opción de volver atrás en el formulario
function volverAtras() {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Si volvés a la pantalla principal vas a perder tu progreso en el formulario.",
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Volvamos'
    }).then((result) => {
        if (result.isDismissed) {
            window.location = "../index.html"
        }
    })
}

// Iniciamos en el "paso 0" o pantalla de información
let currentStep = 0;
let formData = {
    nombreReferente: '',
    apellidoReferente: '',
    emailReferente: '',
    telefonoReferente: '',
    nombreOrg: '',
    provincia: '',
    municipio: '',
    direccion: '',
    telefonoOrg: '',
    emailOrg: '',
};

function showStep(step) {
    // Todos los pasos tienen un display = none al inicializar el programa. 
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';

    if (step === 0) {
        // Si estamos en la pantalla de información, ocultamos la barra de progreso
        const progressBar = document.querySelector('.progress-bar-container');
        progressBar.style.display = 'none';
    } else {
        // Caso contrario, en los pasos restantes se mostrará
        const progressBar = document.querySelector('.progress-bar-container');
        progressBar.style.display = 'flex';
    }

    // Obtenemos el "número de paso" en el que nos encontramos actualmente y lo mostramos
    document.getElementById('step' + step).style.display = 'block';

    // Actualizar la barra de progreso
    const progressBarSteps = document.querySelectorAll('.step');
    progressBarSteps.forEach((el, index) => {
        // Modifica los estilos según el paso en el que estés actualmente
        if (index + 1 === step) {
            // Modifica los estilos del paso actual
            el.querySelector('.step-number').style.color = '#FFFFFF';
            el.querySelector('.step-number').style.backgroundColor = '#8FD3F4';
            el.querySelector('.step-description').style.color = '#8FD3F4'
        } else if (index + 1 < step) {
            // Modifica los estilos de los pasos anteriores (ya compleyos y validados)
            el.querySelector('.step-number').style.backgroundColor = '#8FD3F4';
        } else {
            // Modifica los estilos de los pasos futuros o próximos a completar
            el.querySelector('.step-number').style.color = '#E3E3E3';
            el.querySelector('.step-number').style.backgroundColor = '#F7F7F7';
            el.querySelector('.step-description').style.color = '#E3E3E3';
        }
    });

    // En el tercer paso se uestran (a modo de realizar una confirmación antes de enviar el formulario) los vslores colocados en cada input 
    if (step === 3) {
        document.getElementById('confirmationNombreReferente').textContent = 'Nombre del referente: ' + formData.nombreReferente;
        document.getElementById('confirmationApellidoReferente').textContent = 'Apellido del referente: ' + formData.apellidoReferente;
        document.getElementById('confirmationEmailReferente').textContent = 'E-mail del referente: ' + formData.emailReferente;
        document.getElementById('confirmationTelReferente').textContent = 'Número de teléfono del referente: ' + formData.telefonoReferente;
        document.getElementById('confirmationNombreOrg').textContent = 'Nombre de la organización: ' + formData.nombreOrg;
        document.getElementById('confirmationProvincia').textContent = formData.provincia;
        document.getElementById('confirmationMunicipioODepartamento').textContent = formData.municipio;
        document.getElementById('confirmationDireccionOrg').textContent = formData.direccion;
        document.getElementById('confirmationTelOrg').textContent = 'Número de teléfono de la organización: ' + formData.telefonoOrg;
        document.getElementById('confirmationEmailOrg').textContent = 'E-mail de la organización: ' + formData.emailOrg;
    }
}

// Función de validación para el primer paso
function validateStep1() {
    const nombreReferente = document.getElementById('nombreReferente').value;
    const apellidoReferente = document.getElementById('apellidoReferente').value;
    const telefonoReferente = document.getElementById('telefonoReferente').value;
    const emailReferente = document.getElementById('emailReferente').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Si alguno de los campos se encuentra vacío y/o el campo de email no coincide con el patrón presentado, se activará una alerta de Sweet Alert y no se permitirá avanzar al siguiente paso.
    if (
        nombreReferente === '' ||
        apellidoReferente === '' ||
        telefonoReferente === '' ||
        telefonoReferente.length < 10 ||
        !emailPattern.test(emailReferente)
    ) {
        Swal.fire({
            icon: 'info',
            text: 'Por favor, completa los campos requeridos y asegúrate de que la información ingresada sea válida',
            allowOutsideClick: false,
        })
        return false;
    }

    return true; // Permite avanzar al siguiente paso
}

// Función de validación para el segundo paso
function validateStep2() {
    const nombreOrg = document.getElementById('nombreOrg').value;
    const provincia = document.getElementById('selectProvincias').value;
    const municipio = document.getElementById('selectMunicipios').value;
    const direccionOrg = document.getElementById('direccionOrg').value;
    const telefonoOrg = document.getElementById('telefonoOrg').value;
    const emailOrg = document.getElementById('emailOrg').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Si alguno de los campos se encuentra vacío y/o el campo de email no coincide con el patrón presentado, se activará una alerta de Sweet Alert y no se permitirá avanzar al siguiente paso.
    if (
        nombreOrg === '' ||
        provincia === 'Elige una provincia' ||
        municipio === 'Elige un municipio' ||
        direccionOrg === '' ||
        telefonoOrg === '' ||
        telefonoOrg.length < 10 ||
        !emailPattern.test(emailOrg)
    ) {
        Swal.fire({
            icon: 'info',
            text: 'Por favor, completa los campos requeridos y asegúrate de que la información ingresada sea válida',
            allowOutsideClick: false,
        })
        return false;
    }

    return true; // Permite avanzar al siguiente paso
}


// Esta función permite pasar de un paso al otro
function nextStep(step) {
    if (step === 0) {
        // Si estamos en el paso 0 (pantalla de información), al hacer click en el botón de "continuar" se ejecutará esta función, ocultando la pantalla de información, cambiando al paso 1 y mostrando (cambiando el display) el contenido de la misma.
        document.getElementById('infoScreen').style.display = 'none'; // Ocultar la pantalla de información
        currentStep = 1; // Cambiar al paso 1 (datos del referente)
        showStep(currentStep); // Mostrar el paso 1
    } else if (step === 1) {
        // Validación de campos en el primer paso
        if (!validateStep1()) {
            return;
        }

        formData.nombreReferente = document.getElementById('nombreReferente').value;
        formData.apellidoReferente = document.getElementById('apellidoReferente').value;
        formData.telefonoReferente = inputTelReferente.getNumber();
        formData.emailReferente = document.getElementById('emailReferente').value;

        currentStep = 2; // Cambiar al paso 2 (datos de la organización)
        showStep(currentStep); // Mostrar el paso 2
    } else if (step === 2) {
        // Validación de campos en el segundo paso
        if (!validateStep2()) {
            return;
        }

        formData.nombreOrg = document.getElementById('nombreOrg').value;
        formData.provincia = document.getElementById('selectProvincias').value;
        formData.municipio = document.getElementById('selectMunicipios').value;
        formData.direccion = document.getElementById('direccionOrg').value;
        formData.telefonoOrg = inputTelOrganizacion.getNumber(); // Obtener número de teléfono con intlTelInput
        formData.emailOrg = document.getElementById('emailOrg').value;

        currentStep = 3; // Cambiar al paso 3 (confirmación)
        showStep(currentStep); // Mostrar el paso 3
    }
}

function prevStep(step) {
    currentStep--;
    showStep(currentStep);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que la página se recargue

        // Puedes agregar aquí la lógica para enviar el formulario mediante fetch o Ajax
        submitForm();


    });
});

function submitForm() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    fetch('https://formsubmit.co/02b0172da97107a82819e995ea77cfa4', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text()) // Leer la respuesta como texto
        .then(data => {
            Swal.fire({
                title: 'Listo! 🎉',
                icon: 'success',
                html:
                    'El formulario fue enviado con éxito. <br>' + 'Volveremos a la ' + '<b>página principal.</b>',
                footer: '<a href="../index.html">Más información del proceso</a>',
                allowOutsideClick: false,
            }).then((result) => {
                window.location = "../index.html"
            })
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            // Puedes mostrar un mensaje de error al usuario
        });
}



// Mostrar el primer paso al cargar la página
showStep(currentStep);


