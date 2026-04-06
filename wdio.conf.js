import 'dotenv/config'
import allure from 'allure-commandline'

export const config = {
    runner: 'local',

    hostname: 'hub.browserstack.com',

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    specs: [
        './test/specs/**/*.js'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Samsung Galaxy S22',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP,
        'appium:noReset': false,
        
        'bstack:options': {
            projectName: 'Carrefour Mobile Automacao',
            buildName: 'build-1',
            sessionName: 'Login Test',
            debug: true,
            networkLogs: true
        }
    }],

    logLevel: 'info',

    bail: 0,

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['browserstack', {
            browserstackLocal: false
        }]
    ],

    framework: 'mocha',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    beforeTest: async function () {
        globalThis.console.log('🔥 beforeTest rodou');
    const appId = 'com.wdiodemoapp';
    await browser.activateApp(appId);
    await browser.pause(2000);
},

   afterTest: async function (test, context, { error }) {
    const screenshot = await browser.takeScreenshot();

    // opcional: só logar quando falha
    if (error) {
        console.log('Erro capturado, screenshot gerado');
    }

    await browser.terminateApp('com.wdiodemoapp');
    await browser.execute('mobile: clearApp', { appId: 'com.wdiodemoapp' });
},

    onComplete: function () {
        const report = allure(['generate', 'allure-results', '--clean'])
        report.on('exit', function () {
            console.log('Allure report gerado com sucesso!')
        })
    }
}