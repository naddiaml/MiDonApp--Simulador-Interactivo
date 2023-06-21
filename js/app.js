const zona1 = 'Villa Celina';
const centroRecogidaZona1 = 'Av. Primera zona 1234';
const zona2 = 'Villa Madero';
const centroRecogidaZona2 = 'Av. Segunda zona 1234';
const centroRecogidaGeneral = "Av. Zona General 1234";

// Declaración de funciones

function searchByTypeOfDonation() {
    let materialDonations = prompt('Actualmente recibimos todo tipo de donaciones materiales, sin embargo, por una cuestión de espacio necesitamos que primero nos digas cuántas cosas te gustaría donar.\n' +
        '\nPor favor coloca la cantidad de elementos totales que quieras donar en la cajita que vas a ver remarcada de color azul.\n' +
        '\n💡 Recordá que por una cuestión de traslado de las donaciones, la cantidad de elementos totales por persona no puede superar las 10 unidades por donación. Empecemos!');

    if (materialDonations > 10 || materialDonations < 1) {
        alert('⚠️ Tuvimos un problema, así que volveremos un paso atrás en el proceso; \nPor favor, esta vez tené en cuenta que la cantidad de donaciones por persona no puede superar las 10 unidades por cada donación.\n \nEn caso de que quieras donar más, te recomendamos que te comuniques directamente con el centro de tu preferencia.');
        searchONG();
    } else {
        if (isNaN(materialDonations) || materialDonations === null || materialDonations === '' || (materialDonations !== null && materialDonations.trim() === '')) {
            alert('⚠️ Tuvimos un problema. Volveremos un paso atrás en el proceso; por favor, esta vez selecciona una opcion válida.');
            searchONG();
        } else {
            let cantDonation = 0;
            let donation = '';
            for (cantDonation; cantDonation < materialDonations; cantDonation++) {
                donation += '    -   ' + prompt('Por favor, ingrese el nombre del elemento a donar.') + '\n';
            }
            let confirmDonation = confirm('Confirme, por favor, la siguiente donación:' +
                `\n${cantDonation} elementos totales` +
                '\nA donar:\n' + donation);
            if (confirmDonation) {
                alert(`Genial! Podés acercarte a hacer tu donación y/o voluntariado en: \n📍 ${centroRecogidaGeneral}`);
            } else {
                alert('No pasa nada. Nos vemos pronto! 🙋🏻‍♀️');
            }
        }
    }

}

function searchByZone() {
    let zones = prompt('Actualmente, brindamos apoyo en las siguientes zonas. 🗺️' +
        '\nSelecciona una de las opciones de abajo según la zona en la que te interese encontrar organizaciones a las cuales ayudar.\n' +
        `\n1. ${zona1}.` +
        `\n2. ${zona2}.\n` +
        '\n👉🏻 Podés hacer click en el boton de "Cancelar" para volver a las opciones anteriores.');


    if (zones !== null) {
        let zoneValidation;
        switch (true) {
            case (zones == 1):
                zoneValidation = prompt(`Podés donar a las siguientes organizaciones en ${zona1}:\n` +
                    '\nSelecciona una de las opciones de abajo según centro al que quieras donar, colocando el número correspondiente al mismo en la cajita que vas a ver remarcada de color azul.\n' +
                    `\n1. Escuela Nº1\n     Tel: 11 2233 - 4455\n     Dirección: Martin Ugarte 2000, ${zona1}.\n` +
                    `\n2. Escuela Nº2\n     Tel: 11 2334 - 4556\n     Dirección: España 500, ${zona1}.`);
                if (zoneValidation) {
                    alert(`Genial! Podés acercarte a hacer tu donación y/o voluntariado en: \n📍 ${centroRecogidaZona1}`);
                } else {
                    alert('⚠️ Tuvimos un problema. Volveremos un paso atrás en el proceso; por favor, esta vez selecciona una opcion válida.');
                    searchONG();
                }
                break;
            case (zones == 2):
                zoneValidation = prompt(`Podés donar a las siguientes organizaciones en ${zona2}:\n` +
                    '\nSelecciona una de las opciones de abajo según centro al que quieras donar, colocando el número correspondiente al mismo en la cajita que vas a ver remarcada de color azul.\n' +
                    `\n1. Escuela Nº3\n     Tel: 11 2233 - 4455\n     Dirección: Martin Ugarte 2000, ${zona2}.\n` +
                    `\n2. Escuela Nº4\n     Tel: 11 2334 - 4556\n     Dirección: España 500, ${zona2}.`);
                if (zoneValidation) {
                    alert(`Genial! Podés acercarte a hacer tu donación y/o voluntariado en: \n📍 ${centroRecogidaZona2}`);
                } else {
                    alert('⚠️ Tuvimos un problema. Volveremos un paso atrás en el proceso; por favor, esta vez selecciona una opcion válida.');
                    searchONG();
                }
                break;
            default:
                alert('⚠️ Tuvimos un problema. Volveremos un paso atrás en el proceso; por favor, esta vez selecciona una opcion válida.');
                searchONG();
                break;
        }
    } else {
        searchONG();
    }
}

function criteriaVerification(searchCriteria) {
    let criteria;
    switch (true) {
        case (searchCriteria == 1):
            criteria = confirm('Elegiste la opción de filtrar las organizaciones por zona. ¿Continuamos?\n' + '\n👉🏻 Podés hacer click en el boton de "Cancelar" para volver a las opciones anteriores.');
            if (criteria) {
                searchByZone();
            }
            break;
        case (searchCriteria == 2):
            criteria = confirm('Elegiste la opción de filtrar las organizaciones según el tipo de donación. ¿Continuamos?\n' + '\n👉🏻 Podés hacer click en el boton de "Cancelar" para volver a las opciones anteriores.');
            if (criteria) {
                searchByTypeOfDonation();
            }
            break;
        default:
            alert('⚠️ Tuvimos un problema. Por favor, selecciona una opción válida.');
            searchONG();
            break;
    }

    if (criteria !== true) {
        searchONG();
    }
}

function searchONG() {
    let searchCriteria = prompt('Ahora, debes elegir el criterio con el que querés filtrar la búsqueda de organizaciones:\n' +
        '\n1. Quiero filtrar las organizaciones por zona. 🗺️' +
        '\n2. Quiero filtrar las organizaciones según lo que tengo para donar/el voluntariado que quiero hacer. 🎁\n' +
        '\n👉🏻 Haciendo click en el botón de "Cancelar" podés volver a las opciones anteriores.');

    if (searchCriteria !== null) {
        criteriaVerification(searchCriteria);
    } else {
        donationOptions();
    }


}

function verificationOfChosenForm(waysToDonate) {
    let confirmChosenForm;
    switch (true) {
        case (waysToDonate == 1):
            confirmChosenForm = confirm('Elegiste la opción de hacer un voluntariado. ¿Continuamos?\n' + '\n👉🏻 Podés hacer click en el boton de "Cancelar" para volver a las opciones anteriores.');
            break;
        case (waysToDonate == 2):
            confirmChosenForm = confirm('Elegiste la opción de donar algo material. ¿Continuamos?\n' + '\n👉🏻 Podés hacer click en el boton de "Cancelar" para volver a las opciones anteriores.');
            break;
        default:
            alert('⚠️ Tuvimos un problema. Por favor, selecciona una opción válida.');
            donationOptions();
            break;
    }

    if (confirmChosenForm) {
        searchONG();
    } else {
        donationOptions();
    }
}

function donationOptions() {
    let waysToDonate = prompt('Nuestra base de datos permmite saber qué centros de donación reciben el tipo de ayuda que querés brindarles.' +
        '\nSelecciona una de las opciones de abajo según el tipo de donación que quieras hacer colocando el número correspondiente en la cajita que vas a ver remarcada de color azul.\n' +
        '\n1. Quiero hacer un voluntariado.' +
        '\n2. Quiero donar algo material.');

    if (waysToDonate !== null) {
        verificationOfChosenForm(waysToDonate);
    } else {
        alert('No pasa nada. Nos vemos pronto! 🙋🏻‍♀️');
    }
}

function donate() {
    let confirmDonation = confirm('Hola! ¿Cómo estás? Bienvenido a MiDonApp. Pulsa el botón de "Aceptar" aquí abajo para continuar y empezar con tu donación. 👇🏻');
    if (confirmDonation) {
        donationOptions();
    } else {
        alert('No pasa nada. Nos vemos pronto! 🙋🏻‍♀️');
    }
}

// Invocaciones
// Las invocaciones se hicieron mediante el evento "OnClick" en los botones del documento .html