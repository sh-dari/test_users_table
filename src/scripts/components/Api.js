export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getFetchAnswer(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getInitialUsers() {
    return fetch(this.baseUrl,
    {
      headers: this.headers
    })
    .then(res => this.getFetchAnswer(res));
  }
}
