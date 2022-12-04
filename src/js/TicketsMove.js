/* eslint-disable max-len */
export default class TicketsMove {
  constructor() {
    this.clearVars();
  }

  clearVars() {
    this.draggedEl = null;
    this.draggedElCoords = null;
    this.ghostEl = null;
    this.ghostElEmpty = null;
    this.cursX = null;
    this.cursY = null;
    this.insertItem = null;
    this.insertPosition = null;
  }

  emptyGhostElement(e) {
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);

    if (!elemBelow.closest('.column') || !elemBelow.closest('.column-items') || elemBelow.closest('.column-item.empty')) return;

    if (elemBelow.closest('.column-items').innerHTML === '') {
      elemBelow.closest('.column-items').append(this.ghostElEmpty);
      this.insertItem = { column: elemBelow.closest('.column-items').dataset.id };
      return;
    }

    if (!elemBelow.closest('.column-item')) return;

    if (e.pageY === elemBelow.getBoundingClientRect().top + elemBelow.getBoundingClientRect().height / 2) {
      return;
    }

    if (e.pageY < elemBelow.getBoundingClientRect().top + elemBelow.getBoundingClientRect().height / 2) {
      elemBelow.closest('.column-item').before(this.ghostElEmpty);
      this.insertPosition = 'before';
    }

    if (e.pageY > elemBelow.getBoundingClientRect().top + elemBelow.getBoundingClientRect().height / 2) {
      elemBelow.closest('.column-item').after(this.ghostElEmpty);
      this.insertPosition = 'after';
    }

    this.insertItem = { id: +(elemBelow.closest('.column-item').dataset.id), column: elemBelow.closest('.column-items').dataset.id, position: this.insertPosition };
  }

  ticketGrab(e, item) {
    e.preventDefault();

    if (!item) return;

    this.draggedEl = item;
    this.draggedElCoords = this.draggedEl.getBoundingClientRect();

    this.ghostEl = item.cloneNode(true);
    this.ghostEl.classList.add('dragged');

    this.ghostElEmpty = item.cloneNode(false);
    this.ghostElEmpty.classList.add('empty');
    this.ghostElEmpty.style.height = `${this.draggedElCoords.height - 16}px`;
    this.ghostElEmpty.style.backgroundColor = '#d5dbde';
    this.ghostElEmpty.style.cursor = 'grabbing';

    document.body.append(this.ghostEl);

    this.ghostEl.style.left = `${this.draggedElCoords.left - 8}px`;
    this.ghostEl.style.top = `${this.draggedElCoords.top - 8}px`;
    this.cursX = e.pageX - this.draggedElCoords.left + 8;
    this.cursY = e.pageY - this.draggedElCoords.top + 8;

    this.emptyGhostElement(e);
    item.remove();
  }

  ticketMove(e) {
    e.preventDefault();
    if (!this.draggedEl) return;
    this.ghostEl.style.left = `${e.pageX - this.cursX}px`;
    this.ghostEl.style.top = `${e.pageY - this.cursY}px`;
    this.emptyGhostElement(e);
    e.target.classList.add('grabbing');
  }

  ticketLeave() {
    if (!this.draggedEl) return false;

    this.ghostEl.remove();
    this.clearVars();
    return true;
  }

  ticketDrop() {
    if (!this.draggedEl) return false;
    this.ghostEl.remove();
    this.ghostElEmpty.remove();

    const draggedElResult = { draggedElDiv: this.draggedEl, insertItemObj: this.insertItem };
    this.clearVars();

    const deleteGrabbing = Array.from(document.querySelectorAll('.grabbing'));
    if (deleteGrabbing) deleteGrabbing.forEach((tag) => tag.classList.remove('grabbing'));

    return draggedElResult;
  }
}
