chrome.alarms.create("test_alarm", { delayInMinutes: 1, periodInMinutes: 2 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name == "test_alarm") {
        console.log("Ring!");
    }
});
