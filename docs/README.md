# node-template

[![Github Actions](https://img.shields.io/github/workflow/status/nielse63/node-template/Node.js)](https://github.com/nielse63/node-template/actions/workflows/node.js.yml)
![David](https://img.shields.io/david/nielse63/node-template)

> Barebones repo template for node.js apps

## Features

- Linting - `eslint-config-airbnb-base` setup by default
- Code Formatting - `prettier` and `eslint` formatting options enabled
- Node Versioning - `.nvmrc` set to latest LTS
- Testing - Minimal `jest` configuration setup
- CI/CD - Skeleton GitHub Actions included
- Community Files - GitHub community files are created by default

## Installation

1. Click [Use this template](https://github.com/nielse63/node-template/generate) at the top of the node-template GitHub repo
2. Clone your project
3. Run `npm run setup`

## Usage

After you've run the setup script, you're ready to start developing. The structure and content is like any normal basic node.js app:

```
.
├── .bin            # scripts and tooling
├── .github         # github workflows and templates
├── .husky          # git hooks configuration
├── docs            # github-pages docs
├── index.js        # main entry
└── src             # source file directory
    ├── __tests__   # tests
    └── index.js    # main source entry
```

### Scripts

There are a number of useful npm scripts:

| Script            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run setup`   | Installs dependencies and configures the app info |
| `npm run test`    | Run Jest unit tests                               |
| `npm run lint`    | Check and fix all files using ESLint and Prettier |
| `npm run release` | Release a new version of the app                  |
