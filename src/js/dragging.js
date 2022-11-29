export default function dragging() {
  let actualElement;
  const onMouseOver = (e) => {
    actualElement.style.top = `${e.clientY}px`;
    actualElement.style.left = `${e.clientX}px`;
  };

  const onMouseUp = (e) => {
    const mouseUpItem = e.target;
    const parentEl = e.target.parentElement;
    parentEl.insertBefore(actualElement, mouseUpItem);
    actualElement.classList.remove('dragged');
    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseover', onMouseOver);
  };

  const itemsItem = document.querySelectorAll('.items-item');
  itemsItem.forEach((el) => {
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();

      actualElement = e.target;
      actualElement.classList.add('dragged');

      document.documentElement.addEventListener('mouseup', onMouseUp);
      document.documentElement.addEventListener('mouseover', onMouseOver);
    });
  });
}
