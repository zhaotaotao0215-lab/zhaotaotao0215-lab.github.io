const copyButtons = document.querySelectorAll("[data-copy-target]");

copyButtons.forEach((button) => {
  const defaultLabel = button.textContent;

  button.addEventListener("click", async () => {
    const target = document.querySelector(button.dataset.copyTarget);
    if (!target) return;

    const citation = target.textContent.replace(/\s+/g, " ").trim();

    try {
      await navigator.clipboard.writeText(citation);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select citation";
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    window.setTimeout(() => {
      button.textContent = defaultLabel;
    }, 1800);
  });
});
