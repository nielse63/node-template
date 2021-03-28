/* eslint-disable no-template-curly-in-string */

module.exports = {
  git: {
    commitMessage: 'chore: release v${version}',
  },
  github: {
    release: true,
  },
  npm: {
    publish: false,
  },
};
