import { initMobileMenu } from "./modules/mobile-menu";
import { initHeroSlider } from "./modules/slider";

import "../sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroSlider();
});
