import { extendObservable } from "mobx";

class Urls {
  constructor() {
    extendObservable(this, {
      data: [
        {
          domain: "https://www.google.com",
          status: "done",
          data: { 0: 100, 1: 105, 2: 110, 3: 120, 4: 115 }
        },
        {
          domain: "https://www.facebook.com",
          status: "done",
          data: { 0: 100, 1: 105, 2: 110, 3: 120, 4: 115 }
        },
        {
          domain: "https://www.amazon.com",
          status: "done",
          data: { 0: 100, 1: 105, 2: 110, 3: 120, 4: 115 }
        },
        {
          domain: "https://www.youtube.com",
          status: "syncing",
          data: {}
        },
        {
          domain: "https://www.reddit.com",
          status: "syncing",
          data: {}
        }
      ]
    });
  }

  addData(url) {
    this.data.push({
      domain: url,
      status: "syncing",
      data: {}
    });
  }

  changeStatus(index) {
    this.data[index].status = "done";
  }
}

const URL_SESSION = new Urls();
export default URL_SESSION;
