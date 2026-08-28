const filters = document.querySelectorAll(".filter");
const searchInput = document.querySelector(".search-input");
const entries = document.querySelectorAll(".entry");
const resultCount = document.querySelector(".result-count");

let activeFilter = "all";

function normalizeText(value) {
  return (value || "").trim().toLowerCase();
}

function updateFilterState(activeButton) {
  filters.forEach((item) => {
    const isActive = item === activeButton;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
}

function updateTimeline() {
  const query = normalizeText(searchInput?.value);
  let visible = 0;

  entries.forEach((entry) => {
    const typeMatched = activeFilter === "all" || entry.dataset.type === activeFilter;
    const text = normalizeText(`${entry.textContent} ${entry.dataset.keywords || ""}`);
    const queryMatched = !query || text.includes(query);
    const shouldShow = typeMatched && queryMatched;

    entry.classList.toggle("hidden", !shouldShow);
    if (shouldShow) {
      visible += 1;
    }
  });

  if (resultCount) {
    resultCount.textContent = visible > 0 ? `显示 ${visible} 条记录` : "没有匹配记录";
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateFilterState(button);
    updateTimeline();
  });
});

searchInput?.addEventListener("input", updateTimeline);
updateFilterState(document.querySelector(".filter.active") || filters[0]);
updateTimeline();
