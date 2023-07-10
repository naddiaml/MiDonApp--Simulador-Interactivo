const organizaciones = [
    {
        nombre: 'Asociación Civil Avanzar por el Desarrollo Humano',
        direccion: 'Lafuente  3114, Capital Federal, Villa Soldati, Buenos Aires',
        enMaps: 'https://goo.gl/maps/ZQXSkrirfhXe3zah6?coh=178573&entry=tt',
        telefono: '4918-0057',
        email: 'asociacionavanzar@gmail.com',
        sitio: 'www.avanzar.org.ar',
        recibe: ['Muebles', 'Tecnología']
    },
    {
        nombre: 'Las Renatas Animales Especiales',
        direccion: 'Av. Esteban Crovara 1000, Villa Madero, Buenos Aires',
        telefono: '15-3473-2118',
        email: 'lasrenatascm@gmail.com',
        sitio: '',
        recibe: ['Cocina', 'Colchones y Frazadas', 'Muebles', 'Otros (Alimento balanceado, higiene y limpieza, materiales de construcción, pintura)', 'Salud (Incluye medicinas)', 'Tecnología', 'Alimentos']
    }
];

const realizarBusqueda = () => {
    const busqueda = prompt('Ingresá acá abajo la zona en la que te gustaría buscar organizaciones o aquello que quieras donar!');
    
    if (busqueda.length < 3) {
        const confirmReintentar = confirm('La búsqueda debe contener al menos 3 caracteres. Por favor, intentá nuevamente.');
        if (confirmReintentar) {
            realizarBusqueda();
        } else {
            alert('No pasa nada. Nos vemos pronto! 🙋🏻‍♀️');
        }
        return;
    }

    const resultados = organizaciones.filter(organizacion => {
        const { nombre, direccion, telefono, email, sitio, enMaps, recibe } = organizacion;
        const datos = [nombre, direccion, telefono, email, sitio, ...recibe].join(' ');
        return datos.toLowerCase().includes(busqueda.toLowerCase());
    });

    if (resultados.length === 0) {
        const sinResultados = confirm('Lo sentimos! No se encontraron resultados. 🙁 \n\n ¿Te gustaría volver a intentarlo?');
        if (sinResultados) {
            realizarBusqueda();
        } else {
            alert('No pasa nada. Nos vemos pronto! 🙋🏻‍♀️');
        }
    } else {
        const resultadoString = resultados.map(organizacion => {
            const { nombre, direccion, telefono, email, sitio, recibe } = organizacion;
            return `
                Nombre: ${nombre}
                📍 Dirección: ${direccion}
                📞 Teléfono: ${telefono}
                💌 Email: ${email}
                🌎 Sitio Web: ${sitio ? sitio : 'No disponible'}
                Recibe: ${recibe.slice(0, 3).sort().join(', ')}
                ${recibe.length > 3 ? ' y más.' : ''}
            `;
        }).join('\n\n');

        alert(`Resultados de la búsqueda: 🔍 \n${resultadoString}`);
    }
};

const donate = () => {
    const confirmDonation = confirm('Hola! ¿Cómo estás? Bienvenido a MiDonApp. Pulsa el botón de "Aceptar" aquí abajo para continuar y empezar con tu donación. 👇🏻');
    if (confirmDonation) {
        realizarBusqueda();
    } else {
        alert('No pasa nada. Nos vemos pronto! 🙋🏻‍♀️');
    }
};
