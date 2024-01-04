'use strict';

const getStorage = (key) => {
  const dataPhone = JSON.parse(localStorage.getItem(key) || '[]');
  return dataPhone;
};

const setStorage = (key, contact) => {
  const dataPhone = getStorage(key);
  dataPhone.push(contact);
  localStorage.setItem(key, JSON.stringify(dataPhone));
};

const sortStorage = (key) => {
  const dataPhone = getStorage(key);
  const sortData = dataPhone.sort((name1, name2) => {
    const res = name1.name > name2.name ? 1 : -1;
    return res;
  });
  localStorage.setItem(key, JSON.stringify(sortData));
};

const removeStorage = (key, phone) => {
  const dataPhone = getStorage(key);
  const index = dataPhone.findIndex((item) => item.phone === phone);
  if (index !== -1) {
    dataPhone.splice(index, 1);
  }
  localStorage.setItem(key, JSON.stringify(dataPhone));
};

const addContactData = (contact) => {
  setStorage('contact', contact);
  const dataContact = getStorage('contact');
  dataContact.push(contact);
};

module.exports = {
  getStorage,
  setStorage,
  sortStorage,
  removeStorage,
  addContactData,
};
