import funcItemsFull from './funcItemFull';
import dragging from './dragging';

const addCard = document.querySelectorAll('.add-card');
addCard.forEach((item) => {
  item.addEventListener('click', (e) => {
    const menuAddCard = document.querySelector('.menu-add-card');
    if (menuAddCard == null) {
      item.insertAdjacentHTML('afterEnd', `
      <div id="idAddCard" class='menu-add-card'>
        <input type="text" placeholder="Enter a title for this card..." class="formAddCard"></input>
        <div class="btn-close">
          <button type="button" class='btn'>Add Card</button>
        <div class="closeCard"></div>
        </div>
      </div>
    `);
      const btn = document.querySelector('.btn');
      btn.addEventListener('click', () => {
        const text = document.getElementsByTagName('input')[0];
        const val = text.value;
        if (val.length === 0) {
          throw new Error('Поле должно быть заполнено!');
        }
        const btnCard = btn.closest('.items').classList[1];
        const addCardItem = e.target.closest('.items').children[e.target.closest('.items').children.length - 3];
        if (btnCard === 'todo') {
          addCardItem.insertAdjacentHTML('beforeEnd', `
              <li class="items-item">${val}</li>
            `);
        }
        if (btnCard === 'in-progress') {
          addCardItem.insertAdjacentHTML('beforeEnd', `
              <li class="items-item">${val}</li>
            `);
        }
        if (btnCard === 'done') {
          addCardItem.insertAdjacentHTML('beforeEnd', `
              <li class="items-item">${val}</li>
            `);
        }
        funcItemsFull();
        document.querySelector('.menu-add-card').remove();
      });
      const closeCard = document.querySelector('.closeCard');
      closeCard.addEventListener('click', () => {
        document.querySelector('.menu-add-card').remove();
      });
    } else {
      document.querySelector('.menu-add-card').remove();
    }
  });
});
funcItemsFull();
dragging();
