const tabButtons = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".panel");
const filterButtons = document.querySelectorAll(".filter-button");
const resultCards = document.querySelectorAll(".result-card");
const searchInput = document.querySelector(".search-input");
const resultCount = document.querySelector(".result-count");
const themeToggle = document.querySelector(".theme-toggle");

let activeFilter = "all";

function setActiveTab(tabId) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

function updateResults() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visible = 0;

  resultCards.forEach((card) => {
    const matchesType = activeFilter === "all" || card.dataset.type === activeFilter;
    const haystack = `${card.textContent} ${card.dataset.keywords || ""}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const shouldShow = matchesType && matchesQuery;

    card.classList.toggle("hidden", !shouldShow);
    if (shouldShow) {
      visible += 1;
    }
  });

  if (resultCount) {
    resultCount.textContent = `显示 ${visible} 项记录`;
  }
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateResults();
  });
});

searchInput?.addEventListener("input", updateResults);

themeToggle?.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  themeToggle.textContent = dark ? "浅色" : "深色";
  themeToggle.setAttribute("aria-pressed", String(dark));
});

updateResults();
