class WebHook {
  // Private
  #authObj;
  #serverURL = "http:localhost:5001";

  /**
   * @param {string} name
   */
  constructor(authObj) {
    this.#authObj = authObj;
  }

  /**
   * @param {number} interval
   */
  async start(interval = 1000) {
    setInterval(() => {
      console.log("hit");
    }, interval);
  }
}

module.exports = WebHook;
