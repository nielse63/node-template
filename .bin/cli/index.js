const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const log = require('signale');
const globby = require('globby');
const cp = require('child_process');
const exec = require('../helpers/exec');
const paths = require('../helpers/paths');
const pkg = require('../../package.json');

const oldValues = {
  name: pkg.name,
  description: pkg.description,
  authorName: pkg.author.name,
  authorEmail: pkg.author.email,
  githubUsername: 'nielse63',
};

const getGithubUsername = async () => {
  if (!fs.existsSync(path.join(paths.ROOT, '.git'))) {
    return '';
  }
  const output = await exec('git config --get remote.origin.url');
  return output
    .trim()
    .replace('git@github.com:', '')
    .replace('https://github.com/', '')
    .replace('.git', '')
    .split('/')[0];
};

const prompt = async (appRoot = paths.ROOT) => {
  const defaultAuthorName = await exec('git config --get user.name');
  const defaultAuthorEmail = await exec('git config --get user.email');
  const defaultGithubUsername = await getGithubUsername();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'App name',
      default() {
        return path.basename(appRoot);
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'App description',
      default() {
        return 'My awesome node app!';
      },
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Author Name',
      default() {
        return defaultAuthorName;
      },
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Author Email',
      default() {
        return defaultAuthorEmail;
      },
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Github Username',
      default() {
        return defaultGithubUsername;
      },
    },
    // {
    //   type: 'input',
    //   name: 'keywords',
    //   message: 'Keywords',
    //   default() {
    //     return defaultGithubUsername;
    //   },
    // },
  ]);

  return Object.entries(answers).map(([key, value]) => {
    const oldValue = oldValues[key];
    return {
      key,
      oldValue,
      newValue: value,
    };
  });
};

const findAndReplaceInFile = (find, replace, file) => {
  if (find === replace || !fs.existsSync(file)) return;
  log.info(`find: ${find}; replace: ${replace}; file: ${file}`);
  cp.execSync(`sed -i '' -e 's/${find}/${replace}/g' ${file}`);
};

const findAndReplace = async (answers) => {
  const files = await globby([
    `${paths.ROOT}/**/*.{json,md,html}`,
    `!${paths.ROOT}/node_modules/`,
  ]);
  files.forEach((file) => {
    answers.forEach(({ oldValue, newValue }) => {
      if (!oldValue || !newValue) return;
      findAndReplaceInFile(oldValue, newValue, file);
    });
  });
};

const main = async (appRoot = paths.ROOT) => {
  const answers = await prompt(appRoot);
  await findAndReplace(answers);
};

if (!module.parent) {
  main().catch(console.error);
}

module.exports = main;
