//стили для Modal
const config = {
  openPopupClass: "popup_is-opened",
  animatedPopupClass: "popup_is-animated",
};

//функция открытия Modal
 function openPopup(popup) {
  popup.classList.add(config.animatedPopupClass);

//добавляем таймаут для класса анимации      
  setTimeout(() => {
    popup.classList.add(config.openPopupClass);
  }, 0);

  document.addEventListener("keydown", closePopupByESC);
  document.addEventListener("mousedown", closePopupByOverlay);
}

//функция закрытия Modal
 function closePopup(popup) {
  popup.classList.remove(config.openPopupClass);

//замедление анимации     
  setTimeout(() => {
    popup.classList.remove(config.animatedPopupClass);
  }, 500);

  document.removeEventListener("keydown", closePopupByESC);
  document.removeEventListener("mousedown", closePopupByOverlay);
}

//функция закрытия Modal кнопкой ESC
function closePopupByESC(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector("." + config.openPopupClass);

    closePopup(openedPopup);
  }
}

//функция закрытия Modal по оверлэю      
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains(config.openPopupClass)) {
    closePopup(evt.target);
  }
}

export {closePopup,openPopup}