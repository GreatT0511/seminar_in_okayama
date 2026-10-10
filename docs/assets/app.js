(() => {
  "use strict";

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  function activateSession(session, moveFocus = false) {
    const activeTab = tabs.find((tab) => tab.dataset.session === session) || tabs[0];
    tabs.forEach((tab, index) => {
      const isActive = tab === activeTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      panels[index].hidden = !isActive;
    });
    if (moveFocus) activeTab.focus();
  }

  tabs.forEach((tab, index) => {
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", tab.id);
    panels[index].tabIndex = 0;

    tab.addEventListener("click", () => {
      activateSession(tab.dataset.session);
      history.replaceState(null, "", `#${tab.dataset.session}`);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      activateSession(tabs[nextIndex].dataset.session, true);
      history.replaceState(null, "", `#${tabs[nextIndex].dataset.session}`);
    });
  });

  activateSession(location.hash.slice(1));
  document.querySelector('[role="tablist"]').hidden = false;
  window.addEventListener("hashchange", () => {
    const session = location.hash.slice(1);
    if (tabs.some((tab) => tab.dataset.session === session)) activateSession(session);
  });

  for (const session of ["ando", "tanaka"]) {
    const list = document.querySelector(`[data-resources="${session}"]`);
    const resources = window.seminarResources?.[session];
    if (!Array.isArray(resources)) continue;

    for (const resource of resources) {
      if (!resource || typeof resource.title !== "string" || !resource.title.trim() || typeof resource.url !== "string" || !resource.url.trim()) continue;
      let url;
      try {
        url = new URL(resource.url, document.baseURI);
      } catch {
        continue;
      }
      if (!["http:", "https:"].includes(url.protocol)) continue;

      const link = document.createElement("a");
      link.className = "resource-link";
      link.href = url.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${resource.title}（新しいタブで開く）`);

      const copy = document.createElement("span");
      copy.className = "resource-link-copy";
      const title = document.createElement("span");
      title.className = "resource-title";
      title.textContent = resource.title;
      copy.append(title);
      if (resource.description) {
        const description = document.createElement("span");
        description.className = "resource-description";
        description.textContent = resource.description;
        copy.append(description);
      }
      const action = document.createElement("span");
      action.className = "resource-action";
      action.textContent = "資料を開く ↗";
      action.setAttribute("aria-hidden", "true");
      link.append(copy, action);
      list.append(link);
    }

    list.hidden = list.childElementCount === 0;
    document.querySelector(`[data-empty="${session}"]`).hidden = !list.hidden;
  }

  const copyButton = document.getElementById("copy-analysis-prompt");
  const copyStatus = document.getElementById("copy-status");
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    copyButton.disabled = true;
    copyStatus.textContent = "";
    try {
      await navigator.clipboard.writeText(document.getElementById("analysis-prompt").textContent);
      copyStatus.textContent = "プロンプトをコピーしました。Geminiステップに貼り付けてください。";
    } catch {
      copyStatus.textContent = "自動コピーできませんでした。上のプロンプト本文を選択してコピーしてください。";
    } finally {
      copyButton.disabled = false;
    }
  });
})();
