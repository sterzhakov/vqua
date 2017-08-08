class Statistic {

  constructor() {

    this.lastInstanceId = 0

  }

  getLastInstanceId() {
    return this.lastInstanceId
  }

  increaseLastInstanceId() {
    return this.lastInstanceId = this.lastInstanceId + 1
  }

}

module.exports = Statistic
