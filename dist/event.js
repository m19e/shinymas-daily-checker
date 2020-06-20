chrome.alarms.create("UPDATE_CHECK", { delayInMinutes: 1, periodInMinutes: 2 });
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name == "UPDATE_CHECK") {
        console.log("Ring!");
    }
});
