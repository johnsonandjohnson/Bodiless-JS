const { spawn } = require('child_process');

const path = process.env.PATH;
const PATH = `${path}:../../node_modules/.bin`;
const env = { ...process.env, PATH };
console.log(env.PATH);

const child = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  env,
});

child.on('close', () => process.exit(0));
