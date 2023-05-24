import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryMarkup = createGalleryMarkup(galleryItems);

const galleryContainerRef = document.querySelector(".gallery");
galleryContainerRef.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainerRef.addEventListener("click", onImageClick);

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join("");
}

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="1280" height="auto">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscapePress);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
