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
    console.log("check daily mission");
};

const setTimeHMS = (
    date: Date = new Date(),
    h: number = 5,
    m: number = 0,
    s: number = 0
): Date => {
    const result: Date = date;
    result.setHours(h);
    result.setMinutes(m);
    result.setSeconds(s);
    return result;
};

const init = () => {
    console.log("init process");
    chrome.storage.local.clear();
    chrome.alarms.clearAll(() => {
        chrome.alarms.create("RING", { delayInMinutes: 1 });
    });
};

init();

chrome.alarms.onAlarm.addListener((alarm) => {
    const updateHour: number = 5;

    // const now = new Date("2006 7 29 5:38 +0900");
    const now = new Date();

    if (alarm.name == "SET") {
        const ring = setTimeHMS();
        if (now.getHours() >= updateHour) {
            console.log("before dateline:", now.toLocaleString());
            ring.setDate(now.getDate() + 1);
        }
        console.log("alarm will ring:", ring.toLocaleString());
        chrome.alarms.clearAll(() => {
            chrome.alarms.create("RING", { when: ring.getTime() });
        });
    }

    if (alarm.name == "RING") {
        console.log("ring:", now.toLocaleString());
        update();
        chrome.alarms.clearAll(() => {
            chrome.alarms.create("SET", { periodInMinutes: 1 });
        });
    }
});
