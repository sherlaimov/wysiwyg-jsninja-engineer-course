document.addEventListener("DOMContentLoaded", function () {
  const editor = document.getElementsByClassName("editor")[0];
  const toolkit = editor.getElementsByClassName("toolkit")[0];
  const buttons = toolkit.querySelectorAll("button");

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];

    button.addEventListener("click", function (e) {
      let action = this.dataset.action;
      execDefaultAction(action);
    });
  }
});

function execDefaultAction(action) {
  switch (action) {
    case "h1":
      document.execCommand("formatBlock", false, "<h1>");
      return;
    case "h2":
      document.execCommand("formatBlock", false, "<h2>");
      return;
  }
  document.execCommand(action, false);
}
