
var pomo = createDefaultPomodoro();

$(document).ready(function () {
    addButtonListeners(pomo);
});

function addButtonListeners(pomo) {
    $("#incPomodoroTimeId").click(function () {
        updatePomodoroTimeLength(pomo, increaseTime);
    });

    $("#decPomodoroTimeId").click(function () {
        updatePomodoroTimeLength(pomo, decreaseTime);
    });

    $("#incPomoBreakLengthId").click(function () {
        updatePomoBreakLength(pomo, increaseBreak);
    });

    $("#decPomoBreakLengthId").click(function () {
        updatePomoBreakLength(pomo, decreaseBreak);
    });

    $("#startTimerButtonId").click(startTimer);
}

function createDefaultPomodoro() {
    return {
        pomodoroTime: 25,
        pomoBreakLength: 5
    }
}

function updatePomodoroTimeLength(pomo, operationOnLength) {
    pomo.pomodoroTime = operationOnLength();
    $("#pomodoroTimeId").html(pomo.pomodoroTime.toString());
}

function updatePomoBreakLength(pomo, operationOnLength) {
    pomo.pomoBreakLength = operationOnLength();
    $("#pomoBreakLengthId").html(pomo.pomoBreakLength.toString());
}

function decreaseTime() {
    if (validateValueGreaterThanOne(pomo.pomodoroTime)) {
        return pomo.pomodoroTime - 1;
    }
    return pomo.pomodoroTime;
}

function validateValueGreaterThanOne(time) {
    return time > 1;
}

function validateValueLessThanFiftyNine(time) {
    return time < 59;
}

function increaseTime() {
    if (validateValueLessThanFiftyNine(pomo.pomodoroTime)) {
        return pomo.pomodoroTime + 1;
    }
    return pomo.pomodoroTime;
}

function increaseBreak() {
    if (validateValueLessThanFiftyNine(pomo.pomoBreakLength)) {
        return pomo.pomoBreakLength + 1;
    }
    return pomo.pomoBreakLength;
}

function decreaseBreak() {
    if (validateValueGreaterThanOne(pomo.pomoBreakLength)) {
        return pomo.pomoBreakLength - 1;
    }
    return pomo.pomoBreakLength;
}

function startTimer() {
    var intervalTimeLength = pomo.pomodoroTime * 60;
    var intervalEndTime = now() + intervalTimeLength;
    setInterval(function() {

        var timeLeft = intervalEndTime - now();
        if (timeLeft <= 0) {
            clearInterval();
        } else {
            $("#pomoTimeValueId").html(formatTimeLeft(timeLeft));
        }

    }, 1000);
}

function now() {
    return Math.floor(Date.now() / 1000);
}

function formatTimeLeft(timeLeft) {
    var date = new Date(null);
    date.setSeconds(timeLeft);
    return date.toISOString().substr(14, 5);
}
