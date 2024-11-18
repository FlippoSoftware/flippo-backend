/** @type {import('stylelint').Config} */
export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'custom-property-empty-line-before': null,
    'property-no-vendor-prefix': null,
    'rule-empty-line-before': ['always', { except: ['first-nested'] }],
    'selector-class-pattern': null
  }
};
