import Notes from "../data/local/notes.js";

const home = () => {
  const data = Notes.getNotes();
  const notelist = document.querySelector("note-list");
  notelist.innerHTML = "";
  notelist.innerHTML = `<span slot="icon-add"><i class="fa-solid fa-plus"></i></span>`;

  const daftarNotes = () => {
    const apa = data.map((item) => {
      const noteItems = document.createElement("note-items");
      noteItems.setAttribute("data-title", `${item.dataTitle}`);
      noteItems.setAttribute("data-body", `${item.dataBody}`);
      return noteItems;
    });

    return apa;
  };
  notelist.append(...daftarNotes());

  const validateTitleNotes = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Title notes tidak boleh kosong");
      return;
    }
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Title notes minimal 5 karakter");
      return;
    }
    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity("Title notes maksimal 25 karakter");
      return;
    }
  };

  const validateBodyNotes = (event) => {
    event.target.setCustomValidity("");

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Body notes tidak boleh kosong");
      return;
    }
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Body notes minimal 15 karakter");
      return;
    }
  };

  const realtimeValidate = (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationID = event.target.getAttribute("aria-describedby");
    const connectedValidationEL = connectedValidationID
      ? document.getElementById(connectedValidationID)
      : null;

    if (connectedValidationEL && errorMessage && !isValid) {
      connectedValidationEL.innerText = `* ${errorMessage}`;
    } else {
      connectedValidationEL.innerText = "";
    }
  };

  const getForm = document.getElementById("formTambahNotes");
  const getInputTitle = getForm.elements.titleNotes;
  const getInputBody = getForm.elements.bodyNotes;
  getInputTitle.value = "";
  getInputBody.value = "";

  getInputTitle.addEventListener("keyup", validateTitleNotes);
  getInputTitle.addEventListener("invalid", validateTitleNotes);
  getInputTitle.addEventListener("keyup", realtimeValidate);

  getInputBody.addEventListener("keyup", validateBodyNotes);
  getInputBody.addEventListener("invalid", validateBodyNotes);
  getInputBody.addEventListener("keyup", realtimeValidate);
};

export default home;
