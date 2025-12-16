export function initHeaderHeight() {
  const header = document.querySelector(".header");
  if (!header) return;

  const updateHeight = () => {
    document.documentElement.style.setProperty(
      "--header-h",
      `${header.offsetHeight}px`
    );
  };

  const observer = new ResizeObserver(() => {
    updateHeight();
  });

  observer.observe(header);

  updateHeight();
}
