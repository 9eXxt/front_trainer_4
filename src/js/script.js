import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../sass/style.scss";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  loop: true,

  navigation: {
    prevEl: ".icon-left-open",
    nextEl: ".icon-right-open",
  },

  pagination: {
    clickable: true,
    el: ".swiper-pagination",
    // dynamicBullets: true,
    // dynamicMainBullets: 2,
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
      spaceBetween: 35,
    },
  },
});
