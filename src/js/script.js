import { initMobileMenu } from "./modules/mobile-menu";
import { initHeroSlider } from "./modules/slider";
import { initTabs } from "./modules/tabs";

import "../sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroSlider();
  initTabs();
});
