import { Dropzone } from "dropzone";

// Verifica si ya hay una instancia de Dropzone y destrúyela
const existingDropzone = Dropzone.instances[0];
if (existingDropzone) {
    existingDropzone.destroy();
}

// Inicializa Dropzone
Dropzone.options.image = {
    dictDefaultMessage: "Please load the selected images",
    acceptedFiles: ".png, .jpg, .jpeg, .bmp, .svg",
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    // dictRemoveFile:"Borrar fotografia" para español
    // dictMaxFilesExceeded: "Solamente uno"
    headers: {},
    paramName: 'image',

    // Función cuando inicia dropzone
    init: function () {
        const DropzoneInstance = this;
        const btnPublish = document.querySelector('#publish');

        btnPublish.addEventListener('click', function () {
            DropzoneInstance.processQueue();
        });

        DropzoneInstance.on('queuecomplete', function () {
            if (DropzoneInstance.getActiveFiles().length == 0) {
                window.location.href = '/home';
            }
        });
    }
};
