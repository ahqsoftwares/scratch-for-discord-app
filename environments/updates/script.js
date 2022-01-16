const ipcRenderer = require("electron").ipcRenderer;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentVersion").innerText = require(`${__dirname}/../../package.json`).version || "2.0.0-dev";

    const state = document.getElementById("status");
    ipcRenderer.on("checking-for-update", (e) => {
        state.innerHTML = "Checking for updates from AHQSoftwares DB...";
    });

    ipcRenderer.on("new-update", (e, version) => {
        let type = "patch";
        if ((__dirname}/../../package.json`).version - version < 1) {
        type="minor";
        } else if((__dirname}/../../package.json`).version - version < 0.1) {
        type= "patch"
        } else {
            type= "major"
        }
        state.innerHTML = `Update found Type: <b>${type}</b> Tag: <b>${version}</b>!`;
    });

    ipcRenderer.on("download-progress", (e, progress) => {
        let perc = Math.round((progress.current / progress.total) * 100) || 0;
        if (perc < 0) perc = 0;
        else if (perc > 100) perc = 100;

        state.innerHTML = `<b>Downloading Update (${perc}%)</b><br><progress max="100" value="${perc}"></progress>`;
    });

    ipcRenderer.on("update-downloaded", (e) => {
        state.innerHTML = "Finished downloading the update!";
    });

    ipcRenderer.on("error", (e, err) => {
        state.innerHTML = `Error Downloading Update: <b>${err}</b>!`;
    });
});
