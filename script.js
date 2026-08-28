const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeColor = document.querySelector("#theme-color");
const printButtons = document.querySelectorAll('[data-action="print"]');
const filterButtons = document.querySelectorAll(".publication-filter");
const publications = document.querySelectorAll("[data-publication]");
const publicationCount = document.querySelector("#publication-count");
const progressBar = document.querySelector(".scroll-progress span");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setTheme(theme, persist = false) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    themeToggle.setAttribute("aria-checked", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "切换为浅色主题" : "切换为深色主题",
    );

    const icon = themeToggle.querySelector("svg, [data-lucide]");
    if (icon) {
      icon.outerHTML = isDark
        ? '<i data-lucide="sun" aria-hidden="true">明</i>'
        : '<i data-lucide="moon" aria-hidden="true">暗</i>';
    }
  }

  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#101315" : "#f4f7f6");
  }

  if (persist) {
    try {
      localStorage.setItem("resume-theme", isDark ? "dark" : "light");
    } catch (error) {
      // The selected theme still applies for this page view.
    }
  }

  renderIcons();
}

function applyPublicationFilter(filter) {
  let visibleCount = 0;

  publications.forEach((publication) => {
    const shouldShow =
      filter === "all" || publication.dataset.category === filter;
    publication.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (publicationCount) {
    publicationCount.textContent =
      filter === "all"
        ? "共 " + visibleCount + " 篇"
        : "显示 " + visibleCount + " 篇";
  }
}

function updateScrollState() {
  const scrollRange =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollRange > 0 ? Math.min(window.scrollY / scrollRange, 1) : 0;

  if (progressBar) {
    progressBar.style.width = progress * 100 + "%";
  }

  const headerOffset = 140;
  let activeId = "";

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section && section.getBoundingClientRect().top <= headerOffset) {
      activeId = link.getAttribute("href");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === activeId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme, true);
});

printButtons.forEach((button) => {
  button.addEventListener("click", () => window.print());
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyPublicationFilter(button.dataset.filter || "all");
  });
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);

setTheme(root.dataset.theme || "dark");
applyPublicationFilter("all");
updateScrollState();
