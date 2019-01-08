import { extendObservable } from "mobx";

class Urls {
  constructor() {
    extendObservable(this, {
      data: [],
      isLoading: true
    });
    this.getAll();
  }

  getAll() {
    fetch("https://url-monitor-app.herokuapp.com/api")
      .then(res => res.json())
      .then(res => {
        this.data = res.data;
        this.isLoading = false;
      });
  }

  addData(url) {
    fetch("https://url-monitor-app.herokuapp.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
      .then(res => res.json())
      .then(res => {
        this.getAll();
        let refresh = setInterval(() => {
          this.getOne(res._id).then(singleData => {
            let updatedData = this.data.map(obj => {
              return singleData.result._id === obj._id
                ? singleData.result
                : obj;
            });
            this.data = updatedData;
            if (singleData.result.sync_status) clearInterval(refresh);
          });
        }, 1000);
      });
  }

  deleteData(id) {
    fetch(`https://url-monitor-app.herokuapp.com/api/${id}`, {
      method: "DELETE"
    }).then(() => {
      this.getAll();
    });
  }

  getOne(id) {
    return fetch(`https://url-monitor-app.herokuapp.com/api/${id}`).then(res =>
      res.json()
    );
  }

  convert(data) {
    let res = {};
    data.map((item, index) => {
      res[index + 1] = item;
      return index;
    });
    return res;
  }
}

const URL_SESSION = new Urls();
export default URL_SESSION;
