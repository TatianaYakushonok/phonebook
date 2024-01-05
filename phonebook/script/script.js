import serviceStorage from './modules/serviceStorage.js';
const { getStorage } = serviceStorage;
import * as render from './modules/render.js';
import { hoverRow } from './modules/createElements.js';
import control from './modules/control.js';
const { modalControl, deleteControl, formControl } = control;

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
      btnDel} = render.renderPhoneBook(app, title);

    // функционал

    const dataContacts = getStorage('contact');

    const allRow = render.renderContacts(list, dataContacts);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}
