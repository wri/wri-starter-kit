// Stash dev URL, removing any trailing slash
const devURL = process.env.DEV_SITE_URL.replace(/\/$/, "");

// Stash multidev URL, removing any trailing slash
const multidevURL = process.env.MULTIDEV_SITE_URL.replace(/\/$/, "");

const pathsToTest = {
    'Homepage': '/',
    'Hello World': '/hello-world/',
}

let scenariosToTest = [];

for (let [key, value] of Object.entries(pathsToTest)) {
  let first_character = '?';
  if (value.includes('?')) {
    first_character = '&';
  }
    scenariosToTest.push({
        label: key,
        url: multidevURL + value + first_character + "loading=eager",
        referenceUrl: devURL + value + first_character + "loading=eager",
        hideSelectors: [
          '.osano-cm-window__dialog',
          '.osano-cm-window',
          '.region-modals',
          '.region-top-modals',
          'iframe'
        ],
        removeSelectors: [
          "iframe",
          '.region-top-modals',
        ],
        requireSameDimensions: false,
        selectorExpansion: true,
        selectors: [
            'document',
        ],
        readyEvent: null,
        delay: 5000,
        misMatchThreshold: 0.5,
    })
}

module.exports = {
    id: 'test',
    viewports: [{
            name: 'phone',
            width: 400,
            height: 480
        },
        {
            name: 'tablet',
            width: 800,
            height: 768
        },
        {
            "name": "desktop",
            "width": 1920,
            "height": 1080
        }
    ],
    scenarios: scenariosToTest,
    paths: {
        bitmaps_reference: 'backstop_data/bitmaps_reference',
        bitmaps_test: 'backstop_data/bitmaps_test',
        html_report: 'backstop_data/html_report',
        ci_report: 'backstop_data/ci_report'
    },
    report: ['browser', 'CI'],
    engine: 'puppeteer',
    engineOptions: {
        args: ['--no-sandbox']
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 5,
    debug: false,
    debugWindow: false
};
