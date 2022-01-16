const RPC = require("discord-rpc");
const db = require("../storage/database");
const CLIENT_ID = "787309462415343667";
const packageMeta = require("../../../package.json");

RPC.register(CLIENT_ID);

class RichPresence {
    id = CLIENT_ID;
    client = new RPC.Client({ transport: "ipc" });
    startedAt = Date.now();
    ready = false;

    enabled() {
        return db.get("rpcEnabled");
    }

    login() {
        console.log("Enabled?", this.enabled());
        if (!this.enabled()) return Promise.resolve(false);

        return new Promise((resolve) => {
            this.client.on("ready", () => {
                this.ready = true;
                resolve(true);
            });

            this.client
                .login({
                    clientId: this.id
                })
                .catch((e) => {
                    console.error(e);
                    resolve(false);
                });
        });
    }

    setActivity(title) {
        this.client
            .setActivity({
                details: title || "Scratch For Discord 469",
                startTimestamp: this.startedAt,
                buttons: [
                    {
                        label: "Download",
                        url: "https://ahqsoftwares.github.io/scratch-for-discord-app/"
                    },
                    {
                        label: "Online Version",
                        url: "https://deploy-preview-469--scratch-for-discord.netlify.app/"
                    }
                ],
                largeImageKey: "large",
                largeImageText: `Scratch For Discord - v${packageMeta.version} * 469`,
                smallImageKey: "small",
                smallImageText: "s4d 469"
            })
            .catch((e) => {
                console.error(e);
            });
    }

    logout() {
        this.client.destroy().then(
            () => {
                this.ready = false;
            },
            (e) => {
                console.error(e);
            }
        );
    }
}

module.exports = new RichPresence();
