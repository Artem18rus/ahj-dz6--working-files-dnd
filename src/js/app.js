import Tickets from './Tickets';

const demoContent = [
  {
    id: 10,
    column: 'todo',
    text: 'Welcome!!!',
  },
  {
    id: 2,
    column: 'todo',
    text: 'This is a card.',
  },
  {
    id: 3,
    column: 'todo',
    text: 'You can attach pictures and files...',
  },
  {
    id: 4,
    column: 'todo',
    text: '... or checklists.',
  },
  {
    id: 5,
    column: 'in-progress',
    text: 'Invite your team to this board using the Add Members button',
  },
  {
    id: 6,
    column: 'in-progress',
    text: 'Use color-coded labels for organization',
  },
  {
    id: 7,
    column: 'done',
    text: 'To learn more tricks, check out the guide.',
  },
  {
    id: 8,
    column: 'done',
    text: 'Want updates on new features?',
  },
  {
    id: 1,
    column: 'done',
    text: 'Nees help?',
  },
];

const tickets = new Tickets(demoContent);
tickets.init();
