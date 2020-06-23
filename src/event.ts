const getStorage = (key: string): any => {
    let value: any;
    chrome.storage.local.get(key, (v) => {
        value = v;
        console.log(`Get ${key}:${v[key]}`);
    });
    return value;
};

const setStorageUpdated = (updated: boolean) => {
    chrome.storage.local.set({ UPDATED: updated }, () => {
        console.log(`Set UPDATED:${updated}`);
    });
};

const update = () => {
    window.open("https://shinycolors.enza.fun/mission", "_blank");
    setStorageUpdated(true);
    console.log("check daily mission");
};

const init = () => {
    console.log("init process");
    chrome.storage.local.clear();
    setStorageUpdated(false);
    chrome.alarms.clearAll(() => {
        chrome.alarms.create("UPDATED_CHECK", { delayInMinutes: 1 });
    });
};

init();

chrome.alarms.onAlarm.addListener((alarm) => {
    const updateHour: number = 5;
    const updated: boolean = getStorage("UPDATED");

    // const now = new Date("2006 7 29 5:38 +0900");
    const now = new Date();

    if (alarm.name == "UPDATED_CHECK") {
        if (now.getHours() >= 5) {
        } else {
        }
    }
});
