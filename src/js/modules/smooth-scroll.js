// import Lenis from "lenis";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export function initSmoothScroll() {
//   // 1) Lenis
//   const lenis = new Lenis({
//     duration: 1.2,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     smoothWheel: true,
//   });

//   // 2) Lenis <-> GSAP sync
//   let lastDirection = 1; // 1 вниз, -1 вверх
//   lenis.on("scroll", (e) => {
//     if (typeof e?.direction === "number") lastDirection = e.direction;
//     ScrollTrigger.update();
//   });

//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000); // gsap time в секундах, lenis ждёт ms
//   });
//   gsap.ticker.lagSmoothing(0);

//   // 3) Snap points
//   let snapPoints = [];

//   function calculateSnapPoints() {
//     const sections = gsap.utils.toArray("[data-snap]");
//     const headerH =
//       parseInt(
//         getComputedStyle(document.documentElement).getPropertyValue(
//           "--header-h"
//         )
//       ) || 0;
//     const windowHeight = window.innerHeight;

//     snapPoints = sections
//       .map((section) => {
//         const absoluteTop = section.offsetTop;

//         if (section.classList.contains("promo")) return 0;

//         if (section.offsetHeight > windowHeight) {
//           return Math.max(0, absoluteTop - (headerH + 20));
//         }

//         return Math.max(
//           0,
//           absoluteTop - (windowHeight - section.offsetHeight) / 2
//         );
//       })
//       .filter((v) => Number.isFinite(v))
//       .map((v) => Math.round(v));

//     snapPoints = Array.from(new Set(snapPoints)).sort((a, b) => a - b);
//   }

//   calculateSnapPoints();

//   ScrollTrigger.create({
//     trigger: document.body,
//     start: "top top",
//     end: "bottom bottom",
//     onRefresh: calculateSnapPoints,

//     snap: {
//       // value здесь = progress (0..1), не px
//       snapTo: (progress) => {
//         const maxScroll = ScrollTrigger.maxScroll(window) || 0;
//         if (!snapPoints.length || maxScroll === 0) return progress;

//         const currentScroll = progress * maxScroll;

//         // one breakpoint per gesture: к следующей/предыдущей точке по направлению
//         let target = currentScroll;
//         if (lastDirection > 0) {
//           const next = snapPoints.find((p) => p > currentScroll + 1);
//           target = next ?? snapPoints[snapPoints.length - 1];
//         } else {
//           for (let i = snapPoints.length - 1; i >= 0; i--) {
//             if (snapPoints[i] < currentScroll - 1) {
//               target = snapPoints[i];
//               break;
//             }
//           }
//           if (target === currentScroll) target = snapPoints[0];
//         }

//         return target / maxScroll;
//       },
//       // замедление на брейкпоинте
//       duration: { min: 0.5, max: 1.1 },
//       delay: 0,
//       ease: "power1.inOut",
//     },
//   });

//   ScrollTrigger.addEventListener("refresh", () => lenis.resize());
//   ScrollTrigger.refresh();

//   return lenis;
// }

import Lenis from "lenis";

export function initSmoothScroll() {
  // 1. Инициализация
  const lenis = new Lenis({
    duration: 1.5, // Твоя настройка
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Твоя кривая
    smoothWheel: true,
    // orientation: 'vertical',
    // gestureOrientation: 'vertical',
  });

  // 2. Связываем RAF (цикл анимации)
  // Мы объявляем функцию raf внутри, чтобы она имела доступ к переменной lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // 3. Лог для проверки (можешь убрать потом)
  // lenis.on("scroll", (e) => {
  //   console.log(e);
  // });

  // Возвращаем экземпляр, если вдруг захочешь управлять им извне (например, стопнуть скролл при открытии меню)
  return lenis;
}
