/* eslint-disable no-process-exit */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { argv } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readMe = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf8');

const setupContent = (version) => `<!-- BEGIN PACKAGE SETUP -->

### With a package manager (ESModules)

\`\`\`bash
# for the API Client
npm install @algolia/generative-experiences-api-client@${version}
# for the JavaScript UI library
npm install @algolia/generative-experiences-js@${version}
# for the React UI library
npm install @algolia/generative-experiences-react@${version}
\`\`\`

### Without a package manager (CommonJS)

\`\`\`html
// for the API Client
<script src="https://cdn.jsdelivr.net/npm/@algolia/generative-experiences-api-client@${version}/dist/index.umd.cjs"></script>
<script>
  const { createClient } = window['@algolia/generative-experiences-api-client'];
</script>

// for the JavaScript UI library
<script src="https://cdn.jsdelivr.net/npm/@algolia/generative-experiences-js@${version}/dist/index.umd.cjs"></script>
<script>
  // TODO
</script>

// for the React UI library
<script src="https://cdn.jsdelivr.net/npm/@algolia/generative-experiences-react@${version}/dist/index.umd.cjs"></script>
<script>
  // TODO
</script>
\`\`\`

<!-- END PACKAGE SETUP -->`;

// Main script
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

const updatedReadMe = readMe.replace(
  /<!-- BEGIN PACKAGE SETUP -->[\s\S]*<!-- END PACKAGE SETUP -->/,
  setupContent(version)
);

fs.writeFileSync(
  path.resolve(__dirname, '../README.md'),
  updatedReadMe,
  'utf8'
);

console.log('main README.md version updated successfully');
