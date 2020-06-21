var updateHour = 2;
var isUpdate = false;
chrome.alarms.create("UPDATE_CHECK", { delayInMinutes: 1, periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name == "UPDATE_CHECK") {
        var hour = new Date().getHours();
        if (updateHour == hour) {
            if (!isUpdate) {
                window.open("https://shinycolors.enza.fun/mission", "_blank");
                isUpdate = true;
            }
            else {
                isUpdate = false;
            }
        }
    }
});
