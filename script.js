const filters = document.querySelectorAll(".filter");
const searchInput = document.querySelector(".search-input");
const entries = document.querySelectorAll(".entry");
const resultCount = document.querySelector(".result-count");

let activeFilter = "all";

function updateTimeline() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visible = 0;

  entries.forEach((entry) => {
    const typeMatched = activeFilter === "all" || entry.dataset.type === activeFilter;
    const text = `${entry.textContent} ${entry.dataset.keywords || ""}`.toLowerCase();
    const queryMatched = !query || text.includes(query);
    const shouldShow = typeMatched && queryMatched;

    entry.classList.toggle("hidden", !shouldShow);
    if (shouldShow) {
      visible += 1;
    }
  });

  if (resultCount) {
    resultCount.textContent = `显示 ${visible} 条记录`;
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    updateTimeline();
  });
});

searchInput?.addEventListener("input", updateTimeline);
updateTimeline();
