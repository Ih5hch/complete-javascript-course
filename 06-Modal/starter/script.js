'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = Array.from(document.querySelectorAll('.show-modal'));

for (let i = 0; i < btnsOpenModal.length; i += 1) {
  btnsOpenModal[i].addEventListener('click', () => {
    console.log('Button is clicked 🆑');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

// btnsOpenModal.map(button => {
//   button.addEventListener('click', () => {
//     console.log('Button is clicked');
//   });
// });

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
