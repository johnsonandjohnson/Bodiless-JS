const fs = require('fs');

const appVolume = () => process.env.APP_VOLUME || '/app/volume';
const gatsbyPort = () => process.env.PORT || 8888;
const siteName = () => process.env.APP_SITE_NAME || 'test-site';
const backend = () => {
  const backendRelative = 'node_modules/@bodiless/backend/src/server.js';
  const siteLevelBackend = `${appVolume()}/root/sites/${siteName()}/${backendRelative}`;
  return fs.existsSync(siteLevelBackend)
    ? siteLevelBackend : `${appVolume()}/root/${backendRelative}`;
};

module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: `${appVolume()}/root/sites/${siteName()}`,
      script: `${appVolume()}/root/node_modules/.bin/gatsby`,
      args: `develop --port ${gatsbyPort()}`,
    },
    {
      name: 'backend',
      cwd: `${appVolume()}/root/sites/${siteName()}`,
      script: backend(),
    },
  ],
};
