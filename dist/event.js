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
var update = function () {
    window.open("https://shinycolors.enza.fun/mission", "_blank");
    setStorageUpdated(true);
    console.log("check daily mission");
};
var setTimeHMS = function (date, h, m, s) {
    if (h === void 0) { h = 5; }
    if (m === void 0) { m = 0; }
    if (s === void 0) { s = 0; }
    var result = date;
    result.setHours(h);
    result.setMinutes(m);
    result.setSeconds(s);
    return result;
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
    var updateHour = 5;
    var updated = getStorage("UPDATED");
    // const now = new Date("2006 7 29 5:38 +0900");
    var now = new Date();
    if (alarm.name == "UPDATED_CHECK") {
        if (now.getHours() >= 5) {
        }
        else {
        }
    }
});
