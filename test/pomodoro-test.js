describe('pomodoro functions', function() {

    var incPomodoroTime = element(by.id('incPomodoroTimeId'));
    var decPomodoroTime = element(by.id('decPomodoroTimeId'));
    var pomodoroTimeId = element(by.id('pomodoroTimeId'));
    var pomoBreakLength = element(by.id('pomoBreakLengthId'));
    var incPomoBreakLength = element(by.id('incPomoBreakLengthId'));
    var decPomoBreakLength = element(by.id('decPomoBreakLengthId'));

    var pomoTimeValue = element(by.id('pomoTimeValueId'));
    var startTimer = element(by.id('startTimerButtonId'));
    var pauseTimer = element(by.id('pauseTimerButtonId'));

    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.resetUrl = "file:///";
        browser.get('file:///Users/cwancowicz/WebstormProjects/pomodoro/html/Pomodoro.html');
    });

    it('should return correct title', function () {
        expect("Pomodoro Timer").toEqual(browser.getTitle());
    });

    it('should have default length of 25', function () {
        expect(pomodoroTimeId.getText().then(parseInt)).toEqual(25);
    });

    it('should increase length of pomodoro', function() {
        incPomodoroTime.click();
        expect(pomodoroTimeId.getText().then(parseInt)).toEqual(26);
    });

    it('should decrease length of pomodoro', function () {
        decPomodoroTime.click();
        expect(pomodoroTimeId.getText().then(parseInt)).toEqual(24);
    });

    it('should have default length of break of 5', function () {
        expect(pomoBreakLength.getText().then(parseInt)).toEqual(5);
    });

    it('should increase break length by 1', function () {
        incPomoBreakLength.click();
        expect(pomoBreakLength.getText().then(parseInt)).toEqual(6);
    });

    it('should decrease break length by 1', function () {
        decPomoBreakLength.click();
        expect(pomoBreakLength.getText().then(parseInt)).toEqual(4);
    });

    it('should start time interval at pomo session length', function() {
        decreaseTimerTo(1);
        startTimer.click();
        browser.sleep(1000);
        expect(pomoTimeValue.getText()).toEqual('00:59');
    });

    it('should not allow time interval to go below 1 minute', function() {
        decreaseTimerTo(0);
        expect(pomodoroTimeId.getText().then(parseInt)).toEqual(1);
    });

    it('should not allow break interval to go below 1 minute', function() {
        decreaseBreakTo(0);
        expect(pomoBreakLength.getText().then(parseInt)).toEqual(1);
    });

    it('should not allow time interval to exceed 59 minutes', function() {
        increaseTimerTo(61);
        expect(pomodoroTimeId.getText().then(parseInt)).toEqual(59);
    });

    it('should not allow break interval to exceed 59 minutes', function() {
        increaseBreakTo(61);
        expect(pomoBreakLength.getText().then(parseInt)).toEqual(59);
    });

    it('should pause timer when timer has started', function() {
        startTimer.click();
        browser.sleep(1000);
        pauseTimer.click();
        browser.sleep(2000);
        expect(pomoTimeValue.getText()).toEqual('24:59');
    });

    it('should start over when startTime pressed after startTimer pressed first time', function() {
        startTimer.click();
        browser.sleep(1000);
        startTimer.click();
        browser.sleep(1000);
        expect(pomoTimeValue.getText()).toEqual('24:59');
    })

    function decreaseTimerTo(length) {
        for (var i = 25; i > length; i--) {
            decPomodoroTime.click();
        }
    }

    function increaseTimerTo(length) {
        for (var i = 25; i < length; i++) {
            incPomodoroTime.click();
        }
    }

    function increaseBreakTo(length) {
        for (var i = 5; i < length; i++) {
            incPomoBreakLength.click();
        }
    }

    function decreaseBreakTo(length) {
        for (var i = 25; i > length; i--) {
            decPomoBreakLength.click();
        }
    }
});
