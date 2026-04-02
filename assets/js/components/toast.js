class Toast {
  show(message, type = "success") {
    const el = document.createElement("div");

    el.innerText = message;
    el.style = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "error" ? "red" : "green"};
      color: white;
      padding: 10px 15px;
      margin-top: 10px;
      z-index: 9999;
    `;

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 3000);
  }
}

export const toast = new Toast();
