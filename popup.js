document.getElementById("clearWatchLater").addEventListener("click", () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
    let activeTab = tab[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "run" });
  });
});
