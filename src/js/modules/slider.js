import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 👇 ДОБАВЛЯЕМ EXPORT FUNCTION
export function initHeroSlider() {
  // Проверяем, есть ли слайдер на странице, чтобы избежать ошибок
  if (!document.querySelector(".swiper")) return;

  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination, Autoplay],
    // 👇 Лучше добавить observer, как мы обсуждали, чтобы стили не ломались
    observer: true,
    observeParents: true,

    slidesPerView: 1,
    loop: true,

    navigation: {
      prevEl: ".icon-left-open",
      nextEl: ".icon-right-open",
    },

    pagination: {
      clickable: true,
      el: ".swiper-pagination",
    },

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      1920: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
    },
  });
}
