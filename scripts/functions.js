const myInput = document.getElementById("myInput");
const myUL = document.getElementById("myUL");

function addCloseButton(target) {
  const span = document.createElement("span");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  target.appendChild(span);
}

function addNewTask() {
  //console.log("a");
  const task = myInput.value.trim();
  myInput.value = "";
  //console.log(task);
  if (task === "") {
    alert("потрібно ввести текст!");
    return;
  }
  createLi(task);
}

function createLi(text) {
  const liEl = document.createElement("li");
  liEl.textContent = text;
  myUL.appendChild(liEl);
  addCloseButton(liEl);
}

function handleTaskBehavior({ target }) {
  //console.log(target);
  //додати ф-ціонал видалення і статусу задачі
  if (target.nodeName === "li") {
    //console.log("li");
    target.classList.toggle("checked");
  } else if (target.classList.contains("close")) {
    //console.log("close");
    target.parentNode.remove();
  }
}

export { addNewTask, handleTaskBehavior };
