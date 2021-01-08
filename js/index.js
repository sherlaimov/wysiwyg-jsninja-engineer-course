document.addEventListener("DOMContentLoaded", function () {
  const editor = document.getElementsByClassName("editor")[0];
  const editArea = document.querySelector(".edit-area");
  window.editArea = editArea;
  const toolkit = editor.getElementsByClassName("toolkit")[0];
  const buttons = toolkit.querySelectorAll("button");

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];

    button.addEventListener("click", function (e) {
      let action = this.dataset.action;
      formatEditorContents(action);
    });
  }
  document.onselectionchange = monitorSelection;
  analyzeContents(editArea);
});

const analyzeContents = (node) => {
  window.t = node;
  const range = new Range();
  range.setStart(node, 0);
  range.setEnd(node, 1);

  // document.getSelection().addRange(range);
};

const monitorSelection = () => {
  const {
    anchorNode,
    anchorOffset,
    focusNode,
    focusOffset,
  } = document.getSelection();
  const selection = document.getSelection();
  window.selection = selection;
};

const checkIfHasFormatting = (node) => node.parentNode !== window.editArea;

function formatEditorContents(action) {
  if (document.getSelection().toString().length === 0) {
    alert("Please select some text before editing the content.");
    return;
  }

  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  const hasFormatting = checkIfHasFormatting(selection.anchorNode);

  const oldConent = document.createTextNode(range.toString());
  if (hasFormatting) {
    range.deleteContents();
    range.insertNode(oldConent);
    return;
  }
  const newElement = document.createElement(action);
  newElement.append(oldConent);
  range.deleteContents();
  range.insertNode(newElement);

  switch (action) {
    case "h1":
      return;
    case "h2":
      document.execCommand("formatBlock", false, "<h2>");
      return;
  }
  // document.execCommand(action, false);
}
