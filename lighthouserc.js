// https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md

const preset = process.env.LHCI_PRESET || 'desktop';

module.exports = {
  ci: {
    collect: {
      method: 'node',
      url: [
        'http://localhost:9000/',
        'http://localhost:9000/styleguide/product/',
      ],
      startServerCommand: 'cd sites/vital-demo-next && npm run build && npm run start',
      startServerReadyTimeout: 300000,
      settings: {
        preset,
        onlyCategories: [
          'performance'
        ],
      },
      numberOfRuns: 5,
    },
    assert: {
      assertions: {
        'categories:performance': [
          'error',
          {
            minScore: 0.55,
            aggregationMethod: 'optimistic'
          }
        ]
      }
    },
    upload: {
      target: 'temporary-public-storage',
      githubToken: process.env.GITHUB_TOKEN || '',
      githubStatusContextSuffix: `-${preset}`
    },
  }
};
