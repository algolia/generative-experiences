/* eslint-disable no-process-exit */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { argv } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (argv.length < 3) {
  console.error('Usage: node update-main-readme-versions.mjs <version>');
  process.exit(1);
}

const version = argv[2];
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(version)) {
  console.error('Invalid version format. Expected format: x.y.z');
  process.exit(1);
}

const readMe = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8');

const updatedReadMe = readMe.replace(/(\d+\.\d+\.\d+)/g, version);

fs.writeFileSync(
  path.resolve(__dirname, '../README.md'),
  updatedReadMe,
  'utf8'
);

console.log('main README.md version updated successfully');
