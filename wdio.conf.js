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

    capabilities: [
    {
        platformName: 'Android',
        'appium:deviceName': 'Samsung Galaxy S22',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP_ANDROID,
        'appium:noReset': false,

        'bstack:options': {
            projectName: 'Carrefour Mobile Automacao',
            buildName: process.env.CI_PIPELINE_ID
                ? `GitLab Pipeline #${process.env.CI_PIPELINE_ID}`
                : 'Local Run',
            sessionName: 'Android Tests',
            debug: true,
            networkLogs: true
        }
    },
    {
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 15',
        'appium:platformVersion': '17',
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.BROWSERSTACK_APP_IOS,
        'appium:noReset': false,

        'bstack:options': {
            projectName: 'Carrefour Mobile Automacao',
            buildName: process.env.CI_PIPELINE_ID
                ? `GitLab Pipeline #${process.env.CI_PIPELINE_ID}`
                : 'Local Run',
            sessionName: 'iOS Tests',
            debug: true,
            networkLogs: true
        }
    }
],

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
        const appId = driver.isAndroid
            ? 'com.wdiodemoapp'
            : 'org.reactjs.native.example.wdioDemoApp'

        await browser.activateApp(appId)
        await browser.pause(2000)
    },

    afterTest: async function (test, context, { error }) {
        if (error) {
            await browser.takeScreenshot()
            console.log('Erro capturado, screenshot gerado')
        }

        const appId = driver.isAndroid
            ? 'com.wdiodemoapp'
            : 'org.reactjs.native.example.wdioDemoApp'

        await browser.terminateApp(appId)
    },

    onComplete: function () {
        const report = allure(['generate', 'allure-results', '--clean'])
        report.on('exit', function () {
            console.log('Allure report gerado com sucesso!')
        })
    }
}