/* eslint-disable max-len */
import Modals from './Modals';
import TicketsMove from './TicketsMove';

export default class Tickets {
  constructor(tickets) {
    this.ticketsArr = [];
    if (tickets) this.ticketsArr = tickets;
    this.ticketsMove = new TicketsMove();
  }

  init() {
    this.tasks = document.querySelector('.tasks');
    this.columnItems = document.querySelectorAll('.column-items');
    if (localStorage.getItem('cards')) this.ticketsArr = JSON.parse(localStorage.getItem('cards'));

    const sortArr = this.ticketsArr.slice();
    this.lastTicketId = (sortArr.sort((a, b) => a.id - b.id)).at(-1).id;

    this.events();
    this.updateList();
  }

  events() {
    this.tasks.addEventListener('pointerdown', (e) => this.clickEvents(e));
    this.tasks.addEventListener('pointermove', (e) => this.ticketsMove.ticketMove(e));
    this.tasks.addEventListener('pointerleave', () => {
      if (this.ticketsMove.ticketLeave()) {
        this.ticketsMove.ticketLeave();
        this.updateList();
      }
    });
    this.tasks.addEventListener('pointerup', () => {
      const draggedEl = this.ticketsMove.ticketDrop();
      if (!draggedEl) return;
      this.insertTicket(draggedEl);
    });
  }

  clickEvents(e) {
    if (e.target.closest('.add-item')) {
      Tickets.addAnotherTicketCancel();
      this.addAnotherTicket(e);
      return;
    }

    if (e.target.closest('.delete-btn')) {
      e.preventDefault();
      Tickets.addAnotherTicketCancel();
      return;
    }

    if (e.target.closest('.ticket-form')) return;

    if (e.target.closest('.column-item__delete')) {
      this.deleteCard(e);
      return;
    }

    if (e.target.closest('.column-item')) {
      Tickets.addAnotherTicketCancel();
      this.ticketsMove.ticketGrab(e, e.target.closest('.column-item'));
    }
  }

  addAnotherTicket(e) {
    const colItems = e.target.closest('.column').querySelector('.column-items');

    const form = document.createElement('form');
    form.classList.add('ticket-form');
    form.name = 'ticketForm';
    form.noValidate = true;
    form.innerHTML = `
            <textarea name="ticketFormValue" class="add-area" placeholder="Enter a text for this card" required></textarea>
            <div class="buttons">
                <button class="add-btn" type="submit">Add card</button>
                <button class="delete-btn" type="reset">&#10005;</button>
            </div>
        `;

    colItems.after(form);

    const addAnotherCard = e.target.closest('.add-item');
    addAnotherCard.classList.add('hidden');

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      if (form.ticketFormValue.value.trim() === '') {
        Modals.showError('The field cannot be empty', form.ticketFormValue);
        return;
      }

      this.addCard(colItems.dataset.id, form.ticketFormValue.value);
    });

    setTimeout(() => form.ticketFormValue.focus(), 10);

    form.ticketFormValue.addEventListener('focus', () => Modals.hideError());
    form.ticketFormValue.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        document.querySelector('.add-btn').click();
      }
    });
  }

  static addAnotherTicketCancel() {
    const form = document.querySelector('.ticket-form');

    if (!form) return;

    form.remove();
    const addAnotherCardButtonHidden = document.querySelector('.add-item.hidden');
    addAnotherCardButtonHidden.classList.remove('hidden');
  }

  addCard(column, text) {
    this.lastTicketId += 1;
    this.ticketsArr.push({ id: this.lastTicketId, column, text });

    Tickets.addAnotherTicketCancel();
    this.updateList();
  }

  deleteCard(e) {
    const deleteItemId = +e.target.closest('.column-item').dataset.id;
    const deleteItemIndex = this.ticketsArr.findIndex((item) => item.id === deleteItemId);
    this.ticketsArr.splice(deleteItemIndex, 1);
    this.updateList();
  }

  insertTicket(draggedEl) {
    const draggedElRes = draggedEl.draggedElDiv;
    const insertItemRes = draggedEl.insertItemObj;
    const travelerTicket = this.ticketsArr.find((ticket) => ticket.id === +(draggedElRes.dataset.id));

    if (insertItemRes.id === travelerTicket.id) {
      this.updateList();
      return;
    }

    travelerTicket.column = insertItemRes.column;

    const travelerTicketIndex = this.ticketsArr.findIndex((ticket) => ticket.id === +(draggedElRes.dataset.id));
    this.ticketsArr.splice(travelerTicketIndex, 1);

    if (!insertItemRes.id && !insertItemRes.position) {
      this.ticketsArr.push(travelerTicket);
    } else {
      const insertTicketIndex = this.ticketsArr.findIndex((ticket) => ticket.id === +(insertItemRes.id));
      if (insertItemRes.position === 'before') this.ticketsArr.splice(insertTicketIndex, 0, travelerTicket);
      if (insertItemRes.position === 'after') this.ticketsArr.splice(insertTicketIndex + 1, 0, travelerTicket);
    }

    this.updateList();
  }

  updateList() {
    Array.from(this.columnItems).forEach((column) => {
      const col = column;
      col.innerHTML = '';
    });

    this.ticketsArr.forEach((ticket) => {
      const col = Array.from(this.columnItems).find((column) => ticket.column === column.dataset.id);

      const ticketDiv = document.createElement('div');
      ticketDiv.className = 'column-item';
      ticketDiv.dataset.id = ticket.id;

      ticketDiv.innerHTML = `
                <div class="column-item__text">${ticket.text}</div>
                <div class="column-item__delete"></div>
            `;

      col.append(ticketDiv);
    });

    localStorage.setItem('cards', JSON.stringify(this.ticketsArr));
  }
}
