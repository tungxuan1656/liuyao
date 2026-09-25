module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 150],
    'scope-enum': [
      1,
      'always',
      ['repo', 'web', 'core', 'knowledge', 'tooling', 'docs', 'ci', 'deps', 'release'],
    ],
  },
};
