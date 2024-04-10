const errorClass = (formElement, inputElement, errorMessage, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formData.inputErrorClass);
  errorElement.classList.add(formData.errorClass);
  errorElement.textContent = errorMessage;
};

//Удаляем класс ошибки
const deleteError = (formElement, inputElement, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formData.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(formData.errorClass);
};

//Проверка ошибки в зависимости от валидности формы
const checkValidity = (formElement, inputElement, formData) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    errorClass(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formData
    );
  } else {
    deleteError(formElement, inputElement, formData);
  }
};

//Проверка полей на валидность
function hasInvalidInput(inputList) {
  for (let i = 0; i < inputList.length; i++) {
    if (!inputList[i].validity.valid) {
      return true;
    }
  }
  return false;
}

//Отключение кнопки
const toggleButton = (inputList, buttonElement, formData) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formData.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formData.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
//Событие ввода инпута
const setEventListeners = (formElement, formData) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formData.submitButtonSelector
  );
  toggleButton(inputList, buttonElement, formData);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkValidity(formElement, inputElement, formData);
      toggleButton(inputList, buttonElement, formData);
    });
  });
};

//Событие сабмита инпута
const enableValidation = (formData) => {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formData);
  });
};

//Функция отчиски ошибок валидации при закрытии формы
const clearValidation = (formElement, formData) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formData.inputSelector)
  );
  inputList.forEach((inputElement) => {
    deleteError(formElement, inputElement, formData);
    inputElement.setCustomValidity("");
  });
};

export { enableValidation, clearValidation };
