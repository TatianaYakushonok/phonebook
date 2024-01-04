'use strict';

// prettier-ignore
const {getStorage} = require('./modules/serviceStorage.js');
// prettier-ignore
const {renderContacts, renderPhoneBook} = require('./modules/render.js');
// prettier-ignore
const {hoverRow} = require('./modules/createElements.js');
const {
  modalControl,
  deleteControl,
  formControl,
} = require('./modules/control.js');

{
  // prettier-ignore
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp, title);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel} = renderPhoneBook(app, title);

    // функционал

    const dataContacts = getStorage('contact');

    const allRow = renderContacts(list, dataContacts);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}
