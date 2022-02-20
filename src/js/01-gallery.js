// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const selectGallery = document.querySelector('.gallery');

// //
function createGalleryMarkup(ga) {
  const markup = ga
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`;
    })
    .join('');
  return markup;
}

selectGallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

////////////////////////////////////////////////////////////////////////////////////

selectGallery.addEventListener('click', galleryClick);

function galleryClick(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  console.log(evt.target.dataset);
  evt.preventDefault();
  addModal(evt.target.dataset.source);
}
let instance;
// ==============================================
// function addModal(orig) {
//   instance = basicLightbox.create(` <img src="${orig}" ></img>`, {
//     onShow: instance => console.log('onShow', instance),
//     onClose: instance => console.log('onClose', instance),
//   });
//   instance.show(instance => console.log('finished show()', instance));
// }

// -------------------------------------
function addModal(orig) {
  instance = basicLightbox.create(` <img src="${orig}" ></img>`);
  instance.show(() => {
    addEscListener();
  });

  function onEscClick(event) {
    if (event.code === 'Escape') {
      instance.close(() => {
        removeEscListener();
      });
    }
  }
  function addEscListener() {
    window.addEventListener('keydown', onEscClick);
  }
  function removeEscListener() {
    window.removeEventListener('keydown', onEscClick);
  }
}
