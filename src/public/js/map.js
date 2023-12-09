/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/map.js":
/*!************************!*\
  !*** ./src/lib/map.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// Autoinvocación\r\n(function () {\r\n    const lat = 20.176998;\r\n    const lng = -98.075674;\r\n    const map = L.map('map').setView([lat, lng], 16);\r\n    let marker;\r\n    const geocoderService = L.esri.Geocoding.geocodeService();\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n    marker = new L.marker([lat, lng], {\r\n        draggable: true,\r\n        autoPan: true,\r\n    }).addTo(map);\r\n\r\n    // Se agrega el evento 'dragend' para manejar el final del movimiento del marcador\r\n    marker.on('dragend', function (e) {\r\n        const position = marker.getLatLng();\r\n        console.log(`El usuario soltó el marcador en las coordenadas: ${position.lat}, ${position.lng}`);\r\n        map.panTo(new L.LatLng(position.lat, position.lng));\r\n\r\n        // OBTENER LA INFORMACION DE LA DIRECCION FISICA\r\n        geocoderService.reverse().latlng(position, 13).run(function (error, result) {\r\n            console.log(`La información calculada por geocoder al intentar hacer la georeferencia inversa es: ${result}`);\r\n            console.log(result);\r\n\r\n            // Actualiza el contenido del popup del marcador con la dirección\r\n            marker.bindPopup(`<b>Dirección:</b> ${result.address.LongLabel}`).openPopup();\r\n\r\n            // También puedes actualizar otros elementos del DOM\r\n            document.querySelector('.street').textContent = result.address?.Address ?? '';\r\n            document.querySelector('#street').value = result.address?.Address ?? '';\r\n            document.querySelector('#lat').value = result.latlng?.lat ?? '';\r\n            document.querySelector('#lng').value = result.latlng?.lng ?? '';\r\n        });\r\n    });\r\n\r\n    // Agrega el evento 'popupopen' para actualizar la información antes de que se muestre el popup\r\n    marker.on('popupopen', function () {\r\n        const position = marker.getLatLng();\r\n        // OBTENER LA INFORMACION DE LA DIRECCION FISICA\r\n        geocoderService.reverse().latlng(position, 13).run(function (error, result) {\r\n            // Actualiza el contenido del popup del marcador con la dirección\r\n            marker.setPopupContent(`<b>Dirección:</b> ${result.address.LongLabel}`).openPopup();\r\n        });\r\n    });\r\n\r\n    // Almacena la última fecha de visita en el almacenamiento local\r\n    const currentDate = new Date();\r\n    const lastVisitDate = localStorage.getItem('lastVisitDate');\r\n    localStorage.setItem('lastVisitDate', currentDate.toString());\r\n\r\n    // Muestra un mensaje sobre la última fecha de visita\r\n    const lastVisitMessageDiv = document.getElementById('lastVisitMessage');\r\n    if (lastVisitDate) {\r\n        lastVisitMessageDiv.innerText = `Última fecha de vista del mapa: ${lastVisitDate}`;\r\n    } else {\r\n        lastVisitMessageDiv.innerText = 'Esta es tu primera visita al mapa.';\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack://mx.edu.utxj.ti.dsm.awos.bienesraices-220138/./src/lib/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/lib/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;