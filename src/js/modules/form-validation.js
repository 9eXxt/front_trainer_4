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
  // Приоритет 1: Обертка поля
  const fieldWrapper = input.closest(".form__field");
  if (fieldWrapper) return fieldWrapper;

  // Приоритет 2: Обертка Label (специфично для чекбоксов)
  if (input.type === "checkbox") {
    const labelWrapper = input.closest("label");
    if (labelWrapper) return labelWrapper;
  }

  // Приоритет 3: Сам инпут (fallback)
  return input;
}

function showError(input, message) {
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");

  const target = getErrorTarget(input);

  // Ищем ошибку только у непосредственного соседа, чтобы не удалить что-то лишнее
  let errorElement = target.nextElementSibling;

  if (!errorElement || !errorElement.classList.contains("form__error-msg")) {
    errorElement = document.createElement("div");
    errorElement.className = "form__error-msg";
    target.after(errorElement);
  }

  errorElement.textContent = message;
}

function clearError(input) {
  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");

  const target = getErrorTarget(input);
  const errorElement = target.nextElementSibling;

  if (errorElement && errorElement.classList.contains("form__error-msg")) {
    errorElement.remove();
  }
}
