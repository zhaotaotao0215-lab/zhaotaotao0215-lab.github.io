(() => {
  const count = document.getElementById("busuanzi_value_site_pv");
  if (!count) return;

  document.documentElement.classList.add("js-enabled");

  // Preview visits must not contribute to the public site's count.
  if (window.location.hostname !== "zhaotaotao0215-lab.github.io") {
    count.textContent = "发布后统计";
    return;
  }

  let receivedCount = false;
  const unavailable = () => {
    if (!receivedCount) count.textContent = "暂不可用";
  };
  const timeout = window.setTimeout(unavailable, 8000);
  const observer = new MutationObserver(() => {
    if (!/^\d+$/.test(count.textContent.trim())) return;
    receivedCount = true;
    window.clearTimeout(timeout);
    observer.disconnect();
  });
  observer.observe(count, { childList: true, characterData: true, subtree: true });

  const script = document.createElement("script");
  script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  script.async = true;
  script.referrerPolicy = "origin";
  script.addEventListener("error", unavailable, { once: true });
  document.body.appendChild(script);
})();
