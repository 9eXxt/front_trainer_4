/**
 * Инициализирует валидацию форм на странице.
 * Реализует паттерн "Reward Early, Punish Late".
 */
export function initFormValidation() {
  const forms = document.querySelectorAll(".form, .footer__form");

  if (forms.length === 0) return;

  forms.forEach((form) => {
    form.setAttribute("novalidate", true);

    // 1. SUBMIT: Единственный момент, когда мы массово "ругаем" пользователя
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit(form);
    });

    // 2. INPUT / CHANGE / BLUR: Интерактивность полей
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      attachInputListeners(input);
    });
  });
}

// --- ОСНОВНАЯ ЛОГИКА ---

function handleFormSubmit(form) {
  const inputs = form.querySelectorAll("input, textarea");
  let isFormValid = true;
  let firstInvalidInput = null;

  inputs.forEach((input) => {
    // При сабмите проверяем всё и принудительно показываем ошибки (true)
    const isValid = validateInput(input, true);

    if (!isValid) {
      isFormValid = false;
      if (!firstInvalidInput) firstInvalidInput = input;
    }
  });

  if (isFormValid) {
    handleSuccess(form, inputs);
  } else if (firstInvalidInput) {
    firstInvalidInput.focus();
  }
}

function attachInputListeners(input) {
  const isCheckboxOrRadio = input.type === "checkbox" || input.type === "radio";

  if (isCheckboxOrRadio) {
    // ИСПРАВЛЕНИЕ: Для чекбоксов мы ТОЛЬКО убираем ошибку при клике.
    // Мы не проверяем валидность (не вызываем validateInput), чтобы ошибка
    // не выскакивала снова, если пользователь снял галочку.
    // Ошибка появится только при следующем Submit.
    input.addEventListener("change", () => {
      clearError(input);
    });
  } else {
    // Для текстовых полей:
    // 1. При вводе - молча убираем ошибку (даем исправить).
    input.addEventListener("input", () => {
      clearError(input);
    });

    // 2. При уходе - проверяем, но только если поле не пустое.
    input.addEventListener("blur", () => {
      if (input.value.trim() !== "") {
        validateInput(input, true);
      }
    });
  }
}

// --- UI ХЕЛПЕРЫ ---

function handleSuccess(form, inputs) {
  console.log("Form is valid! Sending...");
  // Здесь будет логика отправки на сервер
  form.reset();
  inputs.forEach((input) => clearError(input));
  alert("Thanks! We will contact you.");
}

/**
 * Валидирует поле.
 * @param {HTMLElement} input
 * @param {boolean} showUI - Если true, рисует/стирает ошибку в DOM.
 * Если false, только возвращает статус.
 */
function validateInput(input, showUI = false) {
  const isValid = input.checkValidity();

  if (showUI) {
    if (!isValid) {
      showError(input, getCustomMessage(input));
    } else {
      clearError(input);
    }
  }

  return isValid;
}

function getCustomMessage(input) {
  const v = input.validity;

  if (v.valueMissing) {
    if (input.type === "checkbox") return "Please confirm agreement";
    return "Please fill in this field";
  }
  if (v.typeMismatch) return "Please enter a valid email address";
  if (v.tooShort) return `Please expand text to ${input.minLength} chars`;
  if (v.patternMismatch) return "Please match the requested format";

  return "Invalid value";
}

// --- DOM ХЕЛПЕРЫ ---

function getErrorTarget(input) {
  // Best Practice: Всегда ищем стабильную обертку компонента
  // В твоем HTML это .form__field для всех типов полей (включая чекбокс)
  return input.closest(".form__field");
}

function showError(input, message) {
  const container = getErrorTarget(input);
  if (!container) return; // Защита если верстка поменяется

  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");

  // Ищем уже существующую ошибку внутри контейнера
  let errorElement = container.querySelector(".form__error-msg");

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "form__error-msg";

    // A11Y (Доступность): Генерируем ID для связки
    // Используем id инпута или создаем случайный
    const errorId =
      (input.id || Math.random().toString(36).substr(2, 9)) + "-error";
    errorElement.id = errorId;

    // Связываем инпут с описанием ошибки
    input.setAttribute("aria-describedby", errorId);

    // ВАЖНО: Вставляем ВНУТРЬ контейнера, в самый конец
    container.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

function clearError(input) {
  const container = getErrorTarget(input);
  if (!container) return;

  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby"); // Убираем связку

  // Ищем ошибку ВНУТРИ контейнера и удаляем
  const errorElement = container.querySelector(".form__error-msg");
  if (errorElement) {
    errorElement.remove();
  }
}
