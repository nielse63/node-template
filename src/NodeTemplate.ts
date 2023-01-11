class NodeTemplate {
  constructo(config, features) {
    this.config = config;
    this.features = features;
  }

  async create() {
    return Promise.resolve('done');
  }
}
