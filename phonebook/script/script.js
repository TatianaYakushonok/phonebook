'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  // prettier-ignore
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  // prettier-ignore
  const createButtonsGoup = (params) => {
    const btnsWrapper = document.createElement('div');
    btnsWrapper.classList.add('btn-wrapper');
    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.className = className;
      button.textContent = text;
      button.type = type;

      return button;
    });
    btnsWrapper.append(...btns);

    return {btnsWrapper, btns};
  };

  // prettier-ignore
  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML(
        'beforeend',
        `
          <tr>
            <th class="delete">Удалить</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
          </tr>
        `,
    );
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  // prettier-ignore
  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML(
        'beforeend',
        `
        <button class="close" type="button"></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class="form-group">
          <label class="form-label" for="name">Имя:</label>
          <input class="form-input" type="text" name="name"
            id="name" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="surname">Фамилия:</label>
          <input class="form-input" type="text" name="surname" 
            id="surname" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="phone">Телефон:</label>
          <input class="form-input" type="number" name="phone"
            id="phone" required>
        </div>
    `,
    );
    const buttonsGroup = createButtonsGoup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    overlay.append(form);
    form.append(...buttonsGroup.btns);

    return {
      overlay,
      form,
    };
  };

  // prettier-ignore
  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tdPhone.append(phoneLink);
    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `Все права защищены &copy;${title}`;

    return footer;
  };

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
    const form = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonsGroup.btnsWrapper, table, form.overlay);
    selectorApp.append(header, main, footer);

    return {
      list: table.tbody,
    };
  };

  // prettier-ignore
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp, title);
    const phoneBook = renderPhoneBook(app, title);
    const {list} = phoneBook;
    renderContacts(list, data);
    // функционал
  };

  window.phoneBookInit = init;
}
