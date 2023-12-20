/* eslint-disable max-len */
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
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    tdName.classList.add('contact-name', 'align-middle');

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    tdSurname.classList.add('contact-surname', 'align-middle');

    const tdPhone = document.createElement('td');
    tdPhone.classList.add('align-middle');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdBtnEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.type = 'button';
    buttonEdit.classList.add('btn', 'align-center');
    buttonEdit.insertAdjacentHTML(
        'beforeend',
        `
        <svg xmlns="http://www.w3.org/2000/svg" width="20"
          height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 2.8636 16.8982 3.03233V3.03233Z"
            stroke="#6E6893" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535"
            stroke="#6E6893" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `,
    );
    tdBtnEdit.append(buttonEdit);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdBtnEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach((contact) => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.insertAdjacentHTML('beforeend', `Все права защищены &copy;${title}`);

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
      logo,
      btnAdd: buttonsGroup.btns[0],
      btnDel: buttonsGroup.btns[1],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  // prettier-ignore
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp, title);
    const phoneBook = renderPhoneBook(app, title);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel} = phoneBook;

    // функционал
    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        formOverlay.classList.remove('is-visible');
      }
    });

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }

      if (target.closest('.contact-name')) {
        const sortData = data.sort((name1, name2) => {
          const res = name1.name > name2.name ? 1 : -1;
          return res;
        });
        const sortRows = renderContacts(list, sortData);
        list.innerHTML = '';
        list.append(...sortRows);
      }

      if (target.closest('.contact-surname')) {
        const sortData = data.sort((name1, name2) => {
          const res = name1.surname > name2.surname ? 1 : -1;
          return res;
        });
        const sortRows = renderContacts(list, sortData);
        list.innerHTML = '';
        list.append(...sortRows);
      }
    });
    setTimeout(() => {
      const contact = createRow({
        name: 'Татьяна',
        surname: 'Якушонок',
        phone: '001',
      });
      list.append(contact);
    }, 2000);
  };

  window.phoneBookInit = init;
}
