var getStorage = function (key) {
    var value;
    chrome.storage.local.get(key, function (v) {
        value = v;
        console.log("Get " + key + ":" + v[key]);
    });
    return value;
};
var setStorageUpdated = function (updated) {
    chrome.storage.local.set({ UPDATED: updated }, function () {
        console.log("Set UPDATED:" + updated);
    });
};
var init = function () {
    chrome.alarms.clearAll();
    chrome.storage.local.clear();
    setStorageUpdated(false);
    chrome.alarms.create("UPDATED_CHECK", { delayInMinutes: 1 });
};
init();
var updateHour = 5;
var updated = getStorage("UPDATED");
chrome.alarms.onAlarm.addListener(function (alarm) {
    // const now = new Date("2006 7 29 5:38 +0900");
    var now = new Date();
    if (alarm.name == "UPDATED_CHECK") {
        if (!updated) {
            window.open("https://shinycolors.enza.fun/mission", "_blank");
            setStorageUpdated(true);
            console.log("check daily mission");
        }
        chrome.alarms.clearAll();
        chrome.alarms.create("RUN_CHECK", {
            delayInMinutes: 1,
            periodInMinutes: 60
        });
        console.log("goto run_check");
    }
    if (alarm.name == "RUN_CHECK") {
        if (now.getHours() == updateHour) {
            setStorageUpdated(false);
            console.log("its time");
            chrome.alarms.clearAll();
            chrome.alarms.create("UPDATED_CHECK", { periodInMinutes: 1 });
            console.log("goto updated_check");
        }
        else {
            console.log("not today", now.toLocaleString());
        }
    }
});
