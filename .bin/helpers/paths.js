const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const src = path.join(ROOT, 'src');
const cache = path.join(ROOT, '.cache');

module.exports = {
  ROOT,
  src,
  cache,
};
