(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const themeColor = document.querySelector("#theme-color");
  const progressBar = document.querySelector(".reading-progress span");
  const chapters = [...document.querySelectorAll("[data-chapter]")];
  const chapterLinks = [...document.querySelectorAll("[data-chapter-link]")];
  const broadcastDemo = document.querySelector("#broadcast-demo");
  const broadcastButton = document.querySelector("#broadcast-button");
  const broadcastStatus = document.querySelector("#broadcast-status");

  const createIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  const renderThemeControl = () => {
    if (!themeToggle) return;

    const isDark = root.dataset.theme !== "light";
    themeToggle.setAttribute("aria-checked", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "切换为浅色主题" : "切换为深色主题",
    );
    themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}" aria-hidden="true"></i>`;

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#0c0f0e" : "#f1eee7");
    }

    createIcons();
  };

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = nextTheme;

    try {
      localStorage.setItem("story-theme", nextTheme);
    } catch (error) {
      // The theme still works when storage is unavailable.
    }

    renderThemeControl();
  });

  let scrollTicking = false;

  const updateActiveChapter = () => {
    if (!chapters.length) return;

    const readingLine = Math.min(window.innerHeight * 0.42, 360);
    let activeChapter = chapters[0];

    chapters.forEach((chapter) => {
      if (chapter.getBoundingClientRect().top <= readingLine) {
        activeChapter = chapter;
      }
    });

    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 8
    ) {
      activeChapter = chapters.at(-1);
    }

    chapterLinks.forEach((link) => {
      const isActive = link.dataset.chapterLink === activeChapter.id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateReadingProgress = () => {
    if (!progressBar) return;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    updateActiveChapter();
    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(updateReadingProgress);
    },
    { passive: true },
  );

  window.addEventListener("resize", updateReadingProgress);

  let broadcastTimer;

  broadcastButton?.addEventListener("click", () => {
    window.clearTimeout(broadcastTimer);
    broadcastDemo.classList.remove("is-active");
    void broadcastDemo.offsetWidth;
    broadcastDemo.classList.add("is-active");

    const label = broadcastButton.querySelector("span");
    if (label) label.textContent = "再发一次广播";
    broadcastStatus.textContent = "同一个信号已经发给整个群体。";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      broadcastStatus.textContent = "群体已经向目标位置靠拢。";
      return;
    }

    broadcastTimer = window.setTimeout(() => {
      broadcastStatus.textContent = "没有逐个指挥，群体仍然向目标位置靠拢。";
    }, 2300);
  });

  renderThemeControl();
  updateReadingProgress();
})();
