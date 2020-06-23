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
    console.log("init process");
    chrome.storage.local.clear();
    setStorageUpdated(false);
    chrome.alarms.clearAll(function () {
        chrome.alarms.create("UPDATED_CHECK", { delayInMinutes: 1 });
    });
};
init();
chrome.alarms.onAlarm.addListener(function (alarm) {
    var updateHour = 15;
    var updated = getStorage("UPDATED");
    // const now = new Date("2006 7 29 5:38 +0900");
    var now = new Date();
    console.log("alarm fired:", now.toLocaleString());
    if (alarm.name == "UPDATED_CHECK") {
        console.log("updated process:", now.toLocaleString());
        if (!updated) {
            window.open("https://shinycolors.enza.fun/mission", "_blank");
            setStorageUpdated(true);
            console.log("check daily mission");
        }
        chrome.alarms.clearAll(function () {
            chrome.alarms.create("RUN_CHECK", {
                delayInMinutes: 1,
                periodInMinutes: 15
            });
        });
        console.log("goto run_check");
    }
});
