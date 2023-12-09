// Autoinvocación
(function () {
    const lat = 20.176998;
    const lng = -98.075674;
    const map = L.map('map').setView([lat, lng], 16);
    let marker;
    const geocoderService = L.esri.Geocoding.geocodeService();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true,
    }).addTo(map);

    // Se agrega el evento 'dragend' para manejar el final del movimiento del marcador
    marker.on('dragend', function (e) {
        const position = marker.getLatLng();
        console.log(`El usuario soltó el marcador en las coordenadas: ${position.lat}, ${position.lng}`);
        map.panTo(new L.LatLng(position.lat, position.lng));

        // OBTENER LA INFORMACION DE LA DIRECCION FISICA
        geocoderService.reverse().latlng(position, 13).run(function (error, result) {
            console.log(`La información calculada por geocoder al intentar hacer la georeferencia inversa es: ${result}`);
            console.log(result);

            // Actualiza el contenido del popup del marcador con la dirección
            marker.bindPopup(`<b>Dirección:</b> ${result.address.LongLabel}`).openPopup();

            // También puedes actualizar otros elementos del DOM
            document.querySelector('.street').textContent = result.address?.Address ?? '';
            document.querySelector('#street').value = result.address?.Address ?? '';
            document.querySelector('#lat').value = result.latlng?.lat ?? '';
            document.querySelector('#lng').value = result.latlng?.lng ?? '';
        });
    });

    // Agrega el evento 'popupopen' para actualizar la información antes de que se muestre el popup
    marker.on('popupopen', function () {
        const position = marker.getLatLng();
        // OBTENER LA INFORMACION DE LA DIRECCION FISICA
        geocoderService.reverse().latlng(position, 13).run(function (error, result) {
            // Actualiza el contenido del popup del marcador con la dirección
            marker.setPopupContent(`<b>Dirección:</b> ${result.address.LongLabel}`).openPopup();
        });
    });

    // Almacena la última fecha de visita en el almacenamiento local
    const currentDate = new Date();
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    localStorage.setItem('lastVisitDate', currentDate.toString());

    // Muestra un mensaje sobre la última fecha de visita
    const lastVisitMessageDiv = document.getElementById('lastVisitMessage');
    if (lastVisitDate) {
        lastVisitMessageDiv.innerText = `Última fecha de vista del mapa: ${lastVisitDate}`;
    } else {
        lastVisitMessageDiv.innerText = 'Esta es tu primera visita al mapa.';
    }
})();
