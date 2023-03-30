import { addNewTask, handleTaskBehavior } from "./functions.js";

const addBtn = document.getElementById("addBtn");
const myUL = document.getElementById("myUL");

addBtn.addEventListener("click", addNewTask);
myUL.addEventListener("click", handleTaskBehavior);
