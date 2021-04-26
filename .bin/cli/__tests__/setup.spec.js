const path = require('path');
const fs = require('fs');
const setup = require('../setup');
const pkg = require('../../../package.json');

// vars
const root = path.resolve(__dirname, '../../..');
const fakeRepo = path.resolve(__dirname, 'fake-repo');
const basenames = ['package.json', 'README.md'];
const srcFiles = basenames.map((file) => path.join(root, file));
const fakeFiles = basenames.map((file) => path.join(fakeRepo, file));
const options = {
  name: 'fake-repo',
  description: 'fake test app',
  authorName: 'test user',
  authorEmail: 'test@test.com',
  githubUser: 'test_user',
  root: fakeRepo,
};
const oldValues = {
  name: pkg.name,
  description: pkg.description,
  authorName: pkg.author.name,
  authorEmail: pkg.author.email,
  githubUser: 'nielse63',
};

describe('setup', () => {
  beforeAll(() => {
    // copy fakeFiles into fake repo
    srcFiles.forEach((file, i) => {
      if (!fs.existsSync(file)) return;
      const newFile = fakeFiles[i];
      fs.copyFileSync(file, newFile);
    });
    console.log('fake repo path:', fakeRepo);
    console.log('fake repo files:', fs.readdirSync(fakeRepo));
  });

  afterAll(() => {
    fakeFiles.forEach((file) => {
      if (!fs.existsSync(file)) return;
      fs.unlinkSync(file);
    });
  });

  it('should find and replace name', async () => {
    const valuesArray = Object.entries(options)
      .filter(([, value]) => value !== 'root')
      .map(([key, newValue]) => {
        const oldValue = oldValues[key];
        const files = fakeFiles.filter((file) => {
          const content = fs.readFileSync(file, 'utf8');
          return content.includes(oldValue);
        });
        return {
          key,
          oldValue,
          newValue,
          files,
        };
      });
    await setup(options);
    valuesArray.forEach(({ oldValue, newValue, files }) => {
      files.forEach((file) => {
        const content = fs.readFileSync(file, 'utf8');
        expect(content.includes(oldValue)).toBe(false);
        expect(content.includes(newValue)).toBe(true);
      });
    });
  });
});
