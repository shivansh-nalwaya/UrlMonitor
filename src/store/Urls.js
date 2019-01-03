import { extendObservable } from "mobx";

class Urls {
  constructor() {
    extendObservable(this, {
      data: []
    });
    this.getAll();
  }

  getAll() {
    fetch("https://url-monitor-app.herokuapp.com/api")
      .then(res => res.json())
      .then(res => {
        this.data = res.data;
      });
  }

  addData(url) {
    fetch("https://url-monitor-app.herokuapp.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    }).then(() => {
      this.getAll();
    });
  }

  deleteData(id) {
    fetch(`https://url-monitor-app.herokuapp.com/api/${id}`, {
      method: "DELETE"
    }).then(() => {
      this.getAll();
    });
  }

  convert(data) {
    let res = {};
    data.map((item, index) => {
      res[index + 1] = item;
    });
    return res;
  }
}

const URL_SESSION = new Urls();
export default URL_SESSION;
