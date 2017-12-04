class Core {

  constructor() {

    this.lastUpdateId = 0

  }

  getLastUpdateId() {
    return this.lastUpdateId
  }

  increaseLastUpdateId() {
    return this.lastUpdateId = this.lastUpdateId + 1
  }

}

module.exports = Core
