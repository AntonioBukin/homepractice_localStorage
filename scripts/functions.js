import { save, load } from "./storage.js";

const STORAGE_KEY = "tasks"; //строка яка буде відповідати за назву ключа в localStorage

//save("test", "hello");
//console.log(load("test"));

const myInput = document.getElementById("myInput");
const myUL = document.getElementById("myUL");

let currentId = 0;

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
  addTaskToLocaleStorage(task);
}

function createLi(text, isDone = false, id = currentId) {
  const liEl = document.createElement("li");
  liEl.textContent = text;
  liEl.dataset.id = id;
  if (isDone) liEl.classList.add = "checked";
  myUL.appendChild(liEl);
  addCloseButton(liEl);
}

function handleTaskBehavior({ target }) {
  const currentState = load(STORAGE_KEY);
  //console.log(target);
  //додати ф-ціонал видалення і статусу задачі
  if (target.nodeName === "li") {
    //console.log("li");
    target.classList.toggle("checked");
    const taskIndex = currentState.findIndex(
      (task) => Number(task.id) === Number(target.dataset.id)
    );
    currentState[taskIndex].isDone = !currentState[taskIndex].isDone;
  } else if (target.classList.contains("close")) {
    //console.log("close");
    target.parentNode.remove();
    const taskIndex = currentState.findIndex(
      (task) => Number(task.id) === Number(target.parentNode.dataset.id)
    );

    currentState.splice(taskIndex, 1);
  }
  save(STORAGE_KEY, currentState);
}

//створемо об'єкт. а потім цей об'ект будемо додавати в localStorage
function createTaskObj(text, isDone) {
  return {
    text,
    isDone,
    id: currentId,
  };
}

//ф-ція для зберігання LocaleStorage
function addTaskToLocaleStorage(text, isDone = false) {
  const currentState = load(STORAGE_KEY);
  //console.log(currentState);
  if (currentState === undefined) {
    //створюємо масив і додаємо туди перший об'ект задачі
    const arr = [createTaskObj(text, isDone)];
    save(STORAGE_KEY, arr);
  } else {
    //до вже існуючого масиву додати новий об'ект
    currentState.push(createTaskObj(text, isDone));
    save(STORAGE_KEY, currentState);
  }

  currentId += 1;
}

function fillTaskList() {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined) {
    currentState.forEach(({ text, isDone, id }) => {
      createLi(text, isDone, id);
      currentId = id + 1;
    });
  }
}

export { addNewTask, handleTaskBehavior, fillTaskList };
