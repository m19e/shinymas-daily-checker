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
    console.log("check daily mission");
};
var setTimeHMS = function (date, h, m, s) {
    if (date === void 0) { date = new Date(); }
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
    chrome.alarms.clearAll(function () {
        chrome.alarms.create("RING", { delayInMinutes: 1 });
    });
};
init();
chrome.alarms.onAlarm.addListener(function (alarm) {
    var updateHour = 5;
    // const now = new Date("2006 7 29 5:38 +0900");
    var now = new Date();
    if (alarm.name == "SET") {
        var ring_1 = setTimeHMS();
        if (now.getHours() >= updateHour) {
            console.log("before dateline:", now.toLocaleString());
            ring_1.setDate(now.getDate() + 1);
        }
        console.log("alarm will ring:", ring_1.toLocaleString());
        chrome.alarms.clearAll(function () {
            chrome.alarms.create("RING", { when: ring_1.getTime() });
        });
    }
    if (alarm.name == "RING") {
        console.log("ring:", now.toLocaleString());
        update();
        chrome.alarms.clearAll(function () {
            chrome.alarms.create("SET", { periodInMinutes: 1 });
        });
    }
});
