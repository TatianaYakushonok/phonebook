'use strict';

const {
  getStorage,
  sortStorage,
  removeStorage,
  addContactData,
} = require('./serviceStorage.js');
// prettier-ignore
const {renderContacts} = require('./render.js');
// prettier-ignore
const {createRow} = require('./createElements.js');

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach((del) => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
      const phone = target.closest('.contact').dataset.phone;
      removeStorage('contact', phone);
    }

    if (target.closest('.contact-name')) {
      sortStorage('contact');
      const data = getStorage('contact');
      const sortRows = renderContacts(list, data);
      list.innerHTML = '';
      list.append(...sortRows);
    }

    if (target.closest('.contact-surname')) {
      sortStorage('contact');
      const data = getStorage('contact');
      const sortRows = renderContacts(list, data);
      list.innerHTML = '';
      list.append(...sortRows);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    addContactData(newContact);

    form.reset();
    closeModal();
  });
};

module.exports = {
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
};
