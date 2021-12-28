const ipcRenderer = require("electron").ipcRenderer;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentVersion").innerText = require(`${__dirname}/../../package.json`).version || "2.0.0-dev";

    const state = document.getElementById("status");

    ipcRenderer.on("checking-for-update", (e) => {
        state.innerHTML = "Checking for AHQ Softwares updates...";
    });

    ipcRenderer.on("new-update", (e, version) => {
        state.innerHTML = `AHQ Softwares Server:- Update found <b>${version}</b>!`;
    });

    ipcRenderer.on("download-progress", (e, progress) => {
        let perc = Math.round((progress.current / progress.total) * 100) || 0;
        if (perc < 0) perc = 0;
        else if (perc > 100) perc = 100;

        state.innerHTML = `<b>AHQ Softwares Server:- Downloading Update (${perc}%)</b><br><progress max="100" value="${perc}"></progress>`;
    });

    ipcRenderer.on("update-downloaded", (e) => {
        state.innerHTML = "AHQ Softwares Server:- Finished downloading the update!";
    });

    ipcRenderer.on("error", (e, err) => {
        state.innerHTML = `AHQ Softwares Server Reporter:- Error Downloading Update: <b>${err}</b>!`;
    });
});
