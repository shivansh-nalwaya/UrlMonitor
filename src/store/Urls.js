import { extendObservable } from "mobx";

class Urls {
  constructor() {
    extendObservable(this, {
      data: [
        { domain: "https://www.google.com", status: "done" },
        { domain: "https://www.facebook.com", status: "done" },
        { domain: "https://www.amazon.com", status: "done" },
        { domain: "https://www.youtube.com", status: "syncing" },
        { domain: "https://www.reddit.com", status: "syncing" }
      ]
    });
  }

  addData(url) {
    this.data.push({
      domain: url,
      status: "syncing"
    });
  }

  changeStatus(index) {
    this.data[index].status = "done";
  }
}

const URL_SESSION = new Urls();
export default URL_SESSION;
