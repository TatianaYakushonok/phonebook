'use strict';

// prettier-ignore
const {getStorage} = require('./serviceStorage.js');
const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGoup,
  createTable,
  createForm,
  createRow,
  createFooter,
} = require('./createElements.js');

const renderContacts = (elem, data) => {
  data = getStorage('contact');
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

// prettier-ignore
const renderPhoneBook = (selectorApp, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonsGroup = createButtonsGoup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter(title);

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonsGroup.btnsWrapper, table, overlay);
  selectorApp.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: buttonsGroup.btns[0],
    btnDel: buttonsGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

module.exports = {
  renderContacts,
  renderPhoneBook,
};
