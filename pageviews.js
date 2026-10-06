(() => {
  const status = document.getElementById("pageview-status");
  const badge = document.getElementById("pageview-badge");
  const retry = document.getElementById("pageview-retry");
  if (!status || !badge || !retry) return;

  document.documentElement.classList.add("js-enabled");

  // Preview visits must not contribute to the public site's count.
  if (window.location.hostname !== "zhaotaotao0215-lab.github.io") {
    status.textContent = "发布后统计";
    return;
  }

  const endpoint = new URL("https://hitscounter.dev/api/hit");
  endpoint.search = new URLSearchParams({
    url: "https://zhaotaotao0215-lab.github.io/",
    label: "Views",
    icon: "github",
    color: "#315d9d",
    message: "",
    style: "flat",
    tz: "Asia/Shanghai",
  }).toString();

  let timeout;
  let loaded = false;
  const unavailable = () => {
    if (loaded) return;
    window.clearTimeout(timeout);
    status.hidden = false;
    status.textContent = "计数服务暂不可用";
    retry.hidden = false;
  };

  badge.addEventListener("load", () => {
    if (!badge.naturalWidth) return unavailable();
    loaded = true;
    window.clearTimeout(timeout);
    badge.hidden = false;
    status.hidden = true;
    retry.hidden = true;
  });
  badge.addEventListener("error", unavailable);

  const load = () => {
    loaded = false;
    badge.hidden = true;
    status.hidden = false;
    status.textContent = "统计中";
    retry.hidden = true;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(unavailable, 15000);
    // One image request per visit; never run a third-party counting script.
    badge.removeAttribute("src");
    badge.src = endpoint.href;
  };

  retry.addEventListener("click", load);
  load();
})();
