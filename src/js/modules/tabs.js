export function initTabs() {
  const tabsContainer = document.querySelector(".products-view__tabs");
  const cards = document.querySelectorAll(".product-card");

  // Защита: если на странице нет табов, выходим
  if (!tabsContainer || cards.length === 0) return;

  tabsContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest(".products-view__tab");

    if (
      !clickedTab ||
      clickedTab.classList.contains("products-view__tab--active")
    )
      return;

    const allTabs = tabsContainer.querySelectorAll(".products-view__tab");
    allTabs.forEach((tab) =>
      tab.classList.remove("products-view__tab--active")
    );

    clickedTab.classList.add("products-view__tab--active");

    const filterValue = clickedTab.dataset.filter;

    cards.forEach((card) => {
      card.classList.remove("is-visible");

      const cardCategory = card.dataset.category;

      if (filterValue === "all" || filterValue === cardCategory) {
        card.classList.remove("is-hidden");
        card.classList.add("is-visible");
      } else {
        card.classList.add("is-hidden");
      }
    });
  });

  const activeTab = tabsContainer.querySelector(".products-view__tab--active");
  if (activeTab) {
    const filterValue = activeTab.dataset.filter;
    cards.forEach((card) => {
      if (filterValue === "all" || filterValue === card.dataset.category) {
        card.classList.remove("is-hidden");
        card.classList.add("is-visible");
      } else {
        card.classList.add("is-hidden");
      }
    });
  }
}
