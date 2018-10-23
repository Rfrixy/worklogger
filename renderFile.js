const { remote, ipcRenderer } = require('electron');
const { handleForm} = remote.require('./main');
const currentWindow = remote.getCurrentWindow();

const submitFormButton = document.querySelector("#ipcForm2");
const responseParagraph = document.getElementById('response')

submitFormButton.addEventListener("submit", function(event){
        event.preventDefault();   // stop the form from submitting
        let worktext = document.getElementById("work").value;
        handleForm(currentWindow, worktext)
});

ipcRenderer.on('form-received', function(event, args){
    responseParagraph.innerHTML = args
    /*
        you could choose to submit the form here after the main process completes
        and use this as a processing step
    */
});