export default function funcItemsFull() {
  const itemsItem = document.querySelectorAll('.items-item');

  itemsItem.forEach((item) => {
    item.addEventListener('mouseover', () => {
      item.setAttribute('id', 'myId');

      const myId = document.querySelector('#myId');
      myId.addEventListener('click', (e) => {
        e.target.remove();
      });
    });
    item.addEventListener('mouseout', () => {
      item.removeAttribute('id');
    });
  });
}
