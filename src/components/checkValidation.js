//присвоение класса ошибки
function dattaError(formElement, inputElement, errorMessage, formData) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formData.inputErrorClass);
  errorElement.classList.add(formData.errorClass);
  errorElement.textContent = errorMessage;
}
//функция удаление ошибки
const removeInputError = (formElement, inputElement, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formData.inputErrorClass);
  errorElement.classList.remove(formData.errorClass);
  errorElement.textContent = "";
};

//вывод кастомной ошибки при валидации формы
const CustomValidity = (formElement, formData, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    dattaError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formData
    );
  } else {
    removeInputError(formElement, inputElement, formData);
  }
};
//функция проверки валидности
const validityCheck = (iputList) => {
  return iputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//вкл/выкл активной кнопки
const SwitchActiveButton = (inputList, buttonElement, formData) => {
  if (validityCheck(inputList)) {
    buttonElement.classList.add(formData.inSwitchActiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formData.inSwitchActiveButtonClass);
    buttonElement.disabled = false;
  }
};
//ввод инпут
const EventListeners = (formElement, formData) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formData.submitButtonSelector
  );
  SwitchActiveButton(inputList, buttonElement, formData);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      CustomValidity(formElement, inputElement, formData);
      SwitchActiveButton(inputList, buttonElement, formData);
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
    EventListeners(formElement, formData);
  });
};

//Очистка формы при закрытии Modal
const clearValidation = (formElement, formData) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formData.submitButtonSelector
  );
  buttonElement.classList.add(formData.inSwitchActiveButtonClass);
  buttonElement.disabled = true;
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, formData);
    inputElement.setCustomValidity("");
  });
};

export { enableValidation, clearValidation };
