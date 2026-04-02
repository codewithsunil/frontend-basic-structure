class Loader {
  constructor() {
    this.loader = document.createElement("div");
    this.loader.innerHTML = "Loading...";
    this.loader.style = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: black;
      color: white;
      padding: 10px 20px;
      display: none;
      z-index: 9999;
    `;
    document.body.appendChild(this.loader);
  }

  show() {
    this.loader.style.display = "block";
  }

  hide() {
    this.loader.style.display = "none";
  }
}

export const loader = new Loader();
