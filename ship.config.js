const fs = require('fs');
const path = require('path');

module.exports = {
  monorepo: {
    mainVersionFile: 'lerna.json',
    packagesToBump: [],
    packagesToPublish: [
      'packages/generative-experiences-api-client',
      'packages/generative-experiences-vdom',
      'packages/generative-experiences-react',
      'packages/generative-experiences-js',
    ],
  },
  publishCommand({ tag }) {
    return `yarn publish --access public --tag ${tag}`;
  },
  versionUpdated({ exec, dir, version }) {
    // Update package dependencies
    exec(
      `yarn lerna version ${version} --exact --no-git-tag-version --no-push --yes`
    );

    // Ship.js reads JSON and writes with `fs.writeFileSync(JSON.stringify(json, null, 2))`
    // which causes a lint error in the `lerna.json` file.
    exec('yarn eslint lerna.json --fix');

    // update reade-me version
    exec(`node scripts/update-main-readme-versions.mjs ${version}`);

    // Update version files
    updatePackagesVersionFile({
      version,
      files: [
        path.resolve(
          dir,
          'packages',
          'generative-experiences-api-client',
          'src',
          'version.ts'
        ),
        path.resolve(
          dir,
          'packages',
          'generative-experiences-vdom',
          'src',
          'version.ts'
        ),
        path.resolve(
          dir,
          'packages',
          'generative-experiences-react',
          'src',
          'version.ts'
        ),
        path.resolve(
          dir,
          'packages',
          'generative-experiences-js',
          'src',
          'version.ts'
        ),
      ],
    });
  },
  // Skip preparation if it contains only `chore` commits
  shouldPrepare({ releaseType, commitNumbersPerType }) {
    const { fix = 0 } = commitNumbersPerType;

    if (releaseType === 'patch' && fix === 0) {
      return false;
    }

    return true;
  },
};

function updatePackagesVersionFile({ version, files }) {
  for (const file of files) {
    fs.writeFileSync(file, `export const version = '${version}';\n`);
  }
}
