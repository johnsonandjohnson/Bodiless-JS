const appVolume = () => process.env.APP_VOLUME || '/app/volume';
const gatsbyPort = () => process.env.PORT || 8888;

module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: `${appVolume()}/root/examples/test-site`,
      script: `${appVolume()}/root/node_modules/.bin/gatsby`,
      args: `develop --port ${gatsbyPort()}`,
    },
    {
      name: 'backend',
      cwd: `${appVolume()}/root/examples/test-site`,
      script: `${appVolume()}/root/bodiless-backend/src/server.js`,
      node_args: `-r dotenv/config ${appVolume()}/root/examples/test-site/.env.development`,
    },
  ],
};
