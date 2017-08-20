class NavigationStore {

  constructor() {

    this.liveNodes = []

  }

  setLiveNodes(liveNodes) {

    this.liveNodes = liveNodes

  }

  getLiveNodes() {

    return this.liveNodes

  }

}

module.exports = NavigationStore
