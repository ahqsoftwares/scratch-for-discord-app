import Loader from "../Loading/Loader";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faNetworkWired, faPaintRoller, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
    const URL_VERIFY_REGEX = /^(http(s)?):\/\/((deploy-preview-(\d+)--)?scratch-for-discord.netlify.app|localhost:(\d+))(\/)?$/;
    const [settings, setSettings] = useState(null);

    function refresh() {
        window.ScratchNative?.sendMessage("setActivity", "on settings");
        console.log("[DEBUG] Loading settings...");
        const scratch = window.ScratchNative;

        scratch?.onceMessage("settings", (ev, settingsData) => {
            setSettings(settingsData);
        });

        scratch?.sendMessage("settings");
    }

    useEffect(refresh, []);

    const get = (k) => settings.find((x) => x.id === k)?.data;
    const scratchServerElm = useRef(null);

    return (
        <>
            {settings ? (
                <div className="dark:bg-gray-900 bg-white h-screen w-full">
                    <div className="pt-5 px-20">
                        <h1 className="dark:text-white text-black text-7xl">Settings</h1>
                        <div className="mt-5">
                            <div className="flex flex-col space-y-7">
                                <div className="space-y-3">
                                    <label htmlFor="rpcSettings" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faPaperclip} /> Discord RPC
                                    </label>
                                    <br />
                                    <select
                                        id="rpcSettings"
                                        defaultValue={get("rpcEnabled") ? "on" : "off"}
                                        className="form-select px-4 py-1 w-1/2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                        onChange={(e) => {
                                            window.ScratchNative?.sendMessage("toggleRPC", e.target.value === "on");
                                            if (e.target.value !== "on") window.ScratchNative?.sendMessage("destroyRPC");
                                            else if (e.target.value === "on") window.ScratchNative?.sendMessage("reconnectRPC");
                                            refresh();
                                        }}
                                    >
                                        <option value="on">Enable</option>
                                        <option value="off">Disable</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="scratchSourceUrl" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faNetworkWired} /> Scratch Server
                                    </label>
                                    <br />
                                    <select
                                        id="sidebarSettings"
                                        defaultValue={get("scratchServer") ? "https://deploy-preview-469--scratch-for-discord.netlify.app/" : "https://scratch-for-discord.netlify.app/"}
                                        className="form-select px-4 py-1 w-1/2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                    >
                                        <option value="https://deploy-preview-469--scratch-for-discord.netlify.app/">https://deploy-preview-469--scratch-for-discord.netlify.app/</option>
                                        <option value="https://scratch-for-discord.netlify.app/">https://scratch-for-discord.netlify.app/</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="sidebarSettings" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faBars} /> Sidebar Position
                                    </label>
                                    <br />
                                    <select
                                        id="sidebarSettings"
                                        defaultValue={get("sidebarIsRight") ? "right" : "left"}
                                        className="form-select px-4 py-1 w-1/2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                        onChange={(e) => {
                                            window.ScratchNative?.sendMessage("setSidebarRight", e.target.value === "right");
                                            refresh();
                                        }}
                                    >
                                        <option value="left">Left</option>
                                        <option value="right">Right</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="themeSettings" className="text-xl dark:text-white text-black opacity-90">
                                        <FontAwesomeIcon icon={faPaintRoller} /> Theme
                                    </label>
                                    <br />
                                    <select
                                        id="themeSettings"
                                        defaultValue={get("darkMode") ? "dark" : "light"}
                                        className="form-select px-4 py-1 w-1/2 mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 dark:focus:bg-white focus:ring-0"
                                        onChange={(e) => {
                                            window.ScratchNative?.sendMessage("setTheme", e.target.value === "dark");
                                            refresh();
                                        }}
                                    >
                                        <option value="dark">Dark Theme</option>
                                        <option value="light">Light Theme</option>
                                    </select>
                                </div>

                                <div className="mt-15">
                                    <button
                                        className="bg-blurple-500 hover:bg-blurple-600 text-white hover:text-gray-50 text-xl p-2 rounded-md"
                                        onClick={() => {
                                            window.ScratchNative?.theme();
                                            const content = scratchServerElm.current?.value;
                                            if (content && !URL_VERIFY_REGEX.test(content)) return alert("Unsupported server!");
                                            if (content) window.ScratchNative?.sendMessage("setServer", content);
                                            window.location.reload();
                                        }}
                                    >
                                        Apply Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader loadingMessage="Loading settings..." />
            )}
        </>
    );
}
