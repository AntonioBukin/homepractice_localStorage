export const save = (key, value) => {
  //Ми зробили ф-цію, яка буде зберігати будь-який key,
  //будь-яке value та зберігти в localStorage
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error("Stringify error", err.message);
  }
};

export const load = (key) => {
  //ф-ція, яка завантажує данні з localStorage, приймає key
  //за допомогою getItem, повертає данні
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data); //якщо нічього незнайшли повертати не null
    //a undefined
  } catch (error) {
    console.error("Parse error", err.message);
  }
};
