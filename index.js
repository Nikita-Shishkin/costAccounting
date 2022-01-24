// id="shopping-store"
// id="shopping-date"
// id="shopping-price"
// id="shopping-add"
// id="shopping-list"

let allShoppingList = [];
let inputStore = null;
let inputStoreValue = "";
let tempInputStoreValue = "";
let inputDate = null;
let inputDateValue = "";
let tempInputDateValue = "";
let inputPrice = null;
let inputPriceValue = "";
let tempInputPriceValue = "";
let buttonAddShopping = null;
let tempIndex = -1;
let totalSumm = [];

window.onload = function () {
  inputStore = document.getElementById("shopping-store");
  inputStore.placeholder = "магазин";
  inputStore.addEventListener("change", updateInputStoreValue);
  inputStore.addEventListener("keyup", keyupButtonAdd);
  inputDate = document.getElementById("shopping-date");
  inputDate.addEventListener("change", updateInputDateValue);
  inputDate.addEventListener("keyup", keyupButtonAdd);
  inputPrice = document.getElementById("shopping-price");
  inputPrice.placeholder = "сумма";
  inputPrice.addEventListener("change", updateInputPriceValue);
  inputPrice.addEventListener("keyup", keyupButtonAdd);
  buttonAddShopping = document.getElementById("shopping-add");
  buttonAddShopping.addEventListener("click", onClickButtonAdd);
  // const response = await fetch ('http://localhost:7777/allTask', {
  //   method: "GET",
  // });

  // const result = await response.json();
  // allShoppingList = result;
  // design();
};

const onClickButtonAdd = (index) => {
  if (
    inputStore.value === "" ||
    inputDate.value === "" ||
    inputPrice.value === ""
  ) {
    alert("Веедите данные в пустые поля");
  } else {
    // const response = await fetch('http://localhost:7777/createTask', {
    //   method: 'POST',
    //   headers: {
    //     'Counter-Type': 'applacation/json;charset=utf-8',
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   body: JSON.stringify({
    //     Store: inputStoreValue,
    //     Date: inputDateValue,
    //     Price: inputPriceValue,
    //   });
    // });

    // const result = await response.json()
    allShoppingList.push({
      store: inputStoreValue,
      date: inputDateValue,
      price: inputPriceValue,
    });
    totalSumm.push(Number(inputPriceValue));
    inputStore.value = "";
    inputDate.value = "";
    inputPrice.value = "";
  }
  render();
};
const keyupButtonAdd = (e) => {
  if (e.key === "Enter") {
    onClickButtonAdd();
  }
};
const keyupEdit = (event, index) => {
  if (event.key === "Enter") {
    clickImgDoneShopping(index);
  }
};
const clickImgEditShopping = (index) => {
  tempIndex = index;
  render();
};
const dblclickEditShopping = (index) => {
  tempIndex = index;
  render();
};
const clickImgDeleteShopping = (index) => {
  // const response = await fetch(`http://localhost:7777/deleteTask?_id=${allShoppingList[index]._id}` {
  //   method: "DELETE",
  // });
  allShoppingList.splice(index, 1);
  totalSumm.splice(index, 1);
  render();
};
const changeInputEditStore = (event) => {
  tempInputStoreValue = event.target.value;
};
const changeInputEditDate = (event) => {
  tempInputDateValue = event.target.value;
};
const changeInputEditPrice = (event) => {
  tempInputPriceValue = event.target.value;
};
const clickImgDoneShopping = (index) => {
  console.log(tempInputStoreValue);

  allShoppingList[index].store =
  tempInputStoreValue
  allShoppingList[index].date =
    tempInputDateValue || allShoppingList[index].date;
  allShoppingList[index].price =
    tempInputPriceValue || allShoppingList[index].price;
  totalSumm[index] = Number(tempInputPriceValue) || totalSumm[index];

  // const response = await fetch("http://localhost:7777/updateTask", {
  //   method: "PATCH",
  //   headers: {
  //     'Counter-Type': 'applacation/json;charset=utf-8',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   body: JSON.stringify(allShoppingList[index]),
  // });
  tempIndex = -1;
  render();
};
const clickImgCancelShopping = () => {
  tempIndex = -1;
  render();
};
const updateInputStoreValue = (event) => {
  inputStoreValue = event.target.value;
  render();
};
const updateInputDateValue = (event) => {
  inputDateValue = event.target.value;
};
const updateInputPriceValue = (event) => {
  inputPriceValue = event.target.value;
};

const render = () => {
  let shoppingList = document.getElementById("shopping-list");
  while (shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild);
  }
  if (allShoppingList.length > 0) {
    let totalPrice = document.createElement("p");
    totalPrice.innerText = `Общая сумма покупок: ${
      totalSumm.length > 0 ? totalSumm.reduce((a, b) => a + b) : 0
    } руб.`;
    shoppingList.appendChild(totalPrice);
  }

  allShoppingList.map((item, index) => {
    let cart = document.createElement("div");
    cart.className = "allShoppingList";
    cart.id = `id-${index}`;

    if (tempIndex === index) {
      let inputEditStore = document.createElement("input");
      inputEditStore.type = "text";
      inputEditStore.value = item.store;
      inputEditStore.onkeyup = (event) => keyupEdit(event, index);
      inputEditStore.onchange = (event) => changeInputEditStore(event, index);
      cart.appendChild(inputEditStore);

      let inputEditDate = document.createElement("input");
      inputEditDate.type = "date";
      inputEditDate.value = item.date;
      inputEditDate.onkeyup = (event) => keyupEdit(event, index);
      inputEditDate.onchange = (event) => changeInputEditDate(event);
      cart.appendChild(inputEditDate);

      let inputEditPrice = document.createElement("input");
      inputEditPrice.type = "number";
      inputEditPrice.value = item.price;
      inputEditPrice.onkeyup = (event) => keyupEdit(event, index);
      inputEditPrice.onchange = (event) => changeInputEditPrice(event);
      cart.appendChild(inputEditPrice);

      let imgDoneShopping = document.createElement("img");
      imgDoneShopping.src = "./img/done.jpeg";
      imgDoneShopping.alt = "#";
      imgDoneShopping.onclick = () => clickImgDoneShopping(index);
      cart.appendChild(imgDoneShopping);

      let imgCancelShopping = document.createElement("img");
      imgCancelShopping.src = "./img/cancel.jpeg";
      imgCancelShopping.alt = "#";
      imgCancelShopping.onclick = () => clickImgCancelShopping(index);
      cart.appendChild(imgCancelShopping);
    } else {
      let paragrafStore = document.createElement("p");
      paragrafStore.innerText = `${index + 1}) Магазин: ` + item.store;
      paragrafStore.ondblclick = () => dblclickEditShopping(index);
      cart.appendChild(paragrafStore);

      let paragrafDate = document.createElement("p");
      paragrafDate.innerText = item.date;
      paragrafDate.ondblclick = () => dblclickEditShopping(index);
      cart.appendChild(paragrafDate);

      let paragrafPrice = document.createElement("p");
      paragrafPrice.innerText = item.price + " pуб.";
      paragrafPrice.ondblclick = () => dblclickEditShopping(index);
      cart.appendChild(paragrafPrice);

      let imgEditShopping = document.createElement("img");
      imgEditShopping.src = "./img/edit.svg";
      imgEditShopping.alt = "#";
      imgEditShopping.onclick = () => clickImgEditShopping(index);
      cart.appendChild(imgEditShopping);

      let imgDeleteShopping = document.createElement("img");
      imgDeleteShopping.src = "./img/delete.svg";
      imgDeleteShopping.alt = "#";
      imgDeleteShopping.onclick = () => clickImgDeleteShopping(index);
      cart.appendChild(imgDeleteShopping);
    }

    cart.className = "cart-shopping";
    shoppingList.appendChild(cart);
  });
};
