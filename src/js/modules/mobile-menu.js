export function initMobileMenu() {
  const burgerBtn = document.querySelector(".burger");
  const menu = document.querySelector(".header__nav");
  const body = document.body;

  if (!burgerBtn || !menu) return;

  // 1. Строгая функция ОТКРЫТИЯ
  const openMenu = () => {
    burgerBtn.setAttribute("aria-expanded", "true");
    // menu.classList.add("is-active");
    body.classList.add("no-scroll");

    menu.classList.add("is-open");

    requestAnimationFrame(() => {
      menu.classList.add("is-animate");
    });
  };

  // 2. Строгая функция ЗАКРЫТИЯ
  const closeMenu = () => {
    burgerBtn.setAttribute("aria-expanded", "false");
    // menu.classList.remove("is-active");
    body.classList.remove("no-scroll");

    menu.classList.remove("is-animate");

    // 2. Ждем, пока закончится transition (0.4s), и только потом убираем display
    // { once: true } автоматически удаляет слушатель после срабатывания
    menu.addEventListener(
      "transitionend",
      () => {
        if (!menu.classList.contains("is-animate")) {
          menu.classList.remove("is-open");
        }
      },
      { once: true }
    );
  };

  // 3. Умный переключатель
  const toggleMenu = () => {
    // Источник правды — атрибут кнопки
    const isExpanded = burgerBtn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // --- События ---

  // Клик по бургеру
  burgerBtn.addEventListener("click", toggleMenu);

  // Клик по ссылкам (закрываем меню и возвращаем скролл)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Закрытие по ESC
  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape" && menu.classList.contains("is-active")) {
  //     closeMenu();
  //   }
  // });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });
}
