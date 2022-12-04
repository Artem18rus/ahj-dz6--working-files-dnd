export default class Modals {
  static showError(text, input) {
    const popoverDiv = document.createElement('div');
    popoverDiv.className = 'popover';

    const arrowDiv = document.createElement('div');
    arrowDiv.className = 'arrow';

    const popoverContent = document.createElement('div');
    popoverContent.className = 'popover-body';
    popoverContent.textContent = text;

    popoverDiv.append(arrowDiv);
    popoverDiv.append(popoverContent);

    input.after(popoverDiv);

    popoverDiv.style.top = `${input.getBoundingClientRect().height + 8}px`;
    popoverDiv.style.left = `${(input.getBoundingClientRect().width / 2) - (popoverDiv.getBoundingClientRect().width / 2)}px`;
    arrowDiv.style.left = `${(popoverDiv.getBoundingClientRect().width / 2) - (arrowDiv.getBoundingClientRect().width) + 3}px`;

    popoverDiv.classList.add('popover-visible');
  }

  static hideError() {
    const popover = document.querySelector('.popover');
    if (popover) popover.remove();
  }
}
