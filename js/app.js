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

const organizacionesData = [
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
    },
    {
        nombre: 'Acorn Argentina',
        direccion: 'Av. Cabildo 508, Villa Madero, La Matanza, Buenos Aires',
        telefono: '(011) 1562086009',
        email: 'acornargentina@gmail.com',
        sitio: 'http://www.acorninternational.org',
        recibe: ['Otros (Alimento balanceado, higiene y limpieza, materiales de construcción, pintura)']
    },
    {
        nombre: 'El Rumbo, casa cultural',
        direccion: 'Virrey Vertiz 4721, PB, La Tablada, Buenos Aires',
        telefono: '15-5702-4527',
        email: 'elrumbocultural@gmail.com',
        sitio: '',
        recibe: ['Alimentos', 'Libros', 'Muebles', 'Artículos de recreación', 'Tecnología', 'Útiles escolares']
    },
    {
        nombre: 'Escuela Ciudad Oculta',
        direccion: 'Santander 5955, 1439, Mataderos, CABA, Ciudad de Buenos Aires',
        telefono: '1161378923',
        email: 'damianreynoso05@gmail.com',
        sitio: '',
        recibe: ['Cocina', 'Muebles', 'Otros (Alimento balanceado, higiene y limpieza, materiales de construcción, pintura)', 'Artículos de recreación', 'Tecnología']
    }
];

const organizaciones = organizacionesData.map(data => new Organizacion(
    data.nombre,
    data.direccion,
    data.telefono,
    data.email,
    data.sitio,
    data.enMaps,
    data.recibe
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