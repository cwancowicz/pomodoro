exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/pomodoro-test.js']
    // ,
    // capabilities: {
    //     browserName: 'firefox'
    // }
};
