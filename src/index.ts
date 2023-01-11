require('dotenv').config();
const log = require('signale');
import NodeTemplate from './NodeTemplate';

export default async ({ config, features }) => {
  log.debug('executing node module');
  const nodeTemplate = new NodeTemplate({ config, features });
  return nodeTemplate.create();
};
