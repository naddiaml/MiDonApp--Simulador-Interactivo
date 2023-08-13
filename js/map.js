function initGoogleMap() {
    // Permite personalizar el punto donde se va a inicializar el mapa cada vez que se ingrese a la página o la misma se recargue
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng(-34.6, -58.5)
    });
}

// Array de objetos con los datos de cada organización.
let locations = [];

fetch('../js/organizaciones.json')
    .then(response => response.json())
    .then(data => {
        locations = data;
        function placeMarker(loc) {
            // Variable a la que se le asigna como valor la ruta de la imagen que será el marker de cada punto; 
            /* En caso de ser necesaio, se hará accediendo al array de ubicaciones y luego a la ruta de cada imagen en particular, manteniendo un criterio según el filtro que se vaya aplicando dinámicamente. 
                Agregar a la función → const image = loc.imag;
                Agregar a c/objeto → icon: 'RUTA',
            */
            const image = "../assets/Markers.png"
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(loc.lat, loc.lng),
                map: map,
                icon: image,
            });

            // Permite visualizar una pestaña de información por organización a la vez
            const infowindow = new google.maps.InfoWindow();
            infowindow.close(); // Close previously opened infowindow
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(`
                    <div id="content">
                        <span class="org-name">${loc.nombre}</span>
                        <div class="divider"></div>
                        <div class="data__container">
                            <div class="data data-icon adress">
                                <i class="fa-solid fa-location-dot"></i>
                                <div class="data-adress">${loc.direccion}
                                    <span class="gm-adress"><a href="${loc.enMaps}" target="_blank" class="onMaps">Ver en Google Maps →</a></span></div>
                            </div>
                            <div class="data data-icon"><i class="fa-solid fa-phone"></i>${loc.telefono}</div>
                            <div class="data data-icon"><i class="fa-solid fa-at"></i>${loc.email}</div>
                            <div class="data">${loc.sitio ? `<a href="https://${loc.sitio}" target="_blank" class="website">${loc.sitio}</a>` : ''}</div>
                            <div class="data">
                                <span class="info">Recibe:</span> ${loc.recibe.slice(0, 3).sort().join(', ')}
                                    ${loc.recibe.length > 3 ? ` y más.` : '.'}
                            </div>
                        </div>
                        <button class="adInfo">+ INFO</button>
                    </div>`
                );
                infowindow.open(map, marker);
            });
        }
        // Itera y ubica el marcador en cada ubicación 
        locations.forEach(placeMarker);

    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            icon: 'error',
            html:
                'Hubo un error al cargar los archivos. Por favor, recarga la página e intentalo nuevamente.',
            allowOutsideClick: false,
            confirmButtonText: 'OK'
        })
    });

window.initMap = initGoogleMap;
google.maps.event.addDomListener(window, 'load', initGoogleMap);