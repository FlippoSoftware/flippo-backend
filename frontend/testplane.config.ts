import type { ConfigInput } from 'testplane';

export default {
  baseUrl: 'http://localhost',
  browsers: {
    chrome: {
      automationProtocol: 'devtools',
      desiredCapabilities: {
        browserName: 'chrome'
      },
      headless: true
    }
  },
  gridUrl: 'http://localhost:4444/wd/hub',
  httpTimeout: 60000,
  pageLoadTimeout: 0,
  plugins: {
    '@testplane/storybook': {
      autoScreenshots: true,
      // https://github.com/gemini-testing/hermione-storybook
      // To run hermione storybook tests, use --storybook flag when launching hermione
      // And dont forget to set 'buildStoriesJson: true' in storybook config if you use storybook@6
      enabled: true,
      localport: 6006,
      storybookConfigDir: '.storybook'
    },
    '@testplane/test-filter': {
      // https://github.com/gemini-testing/testplane-test-filter
      enabled: true,
      inputFile: 'testplane-filter.json'
      // Create a file testplane-filter.json
      // With the following structure:
      // [
      //     {
      //         \"fullTitle\": \"some-title\",
      //         \"browserId\": \"some-browser\"
      //     }
      // ]
    },
    '@testplane/url-decorator': {
      // https://github.com/gemini-testing/testplane-url-decorator
      enabled: true,
      url: {
        query: {
          // Write your entries like \"text\": \"ololo\" to add query param &text=ololo
          // You can also specify \"mode\": \"override\", if you need to overwrite existing param
        }
      }
    },
    'html-reporter/testplane': {
      defaultView: 'all',
      diffMode: '3-up-scaled',
      // https://github.com/gemini-testing/html-reporter
      enabled: true,
      path: 'testplane-report'
    }
  },
  resetCursor: false,
  sets: {
    desktop: {
      browsers: ['chrome'],
      files: ['**/tests/*.testplane.(t|j)s']
    }
  },
  testTimeout: 90000
} satisfies ConfigInput;
