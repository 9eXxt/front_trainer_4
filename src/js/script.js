import { initMobileMenu } from "./modules/mobile-menu";
import { initHeroSlider } from "./modules/slider";
import { initTabs } from "./modules/tabs";
import { initFormValidation } from "./modules/form-validation";
import { initHeaderHeight } from "./modules/header-height";
import { initSmoothScroll } from "./modules/smooth-scroll";

import "../sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroSlider();
  initTabs();
  initFormValidation();
  initHeaderHeight();
  initSmoothScroll();
});
