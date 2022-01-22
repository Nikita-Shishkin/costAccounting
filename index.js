// id="shopping-store"
// id="shopping-date"
// id="shopping-price"
// id="shopping-add"
// id="shopping-list"

let allShoppingList = [];
let inputStore = null;
let inputStoreValue = '';
let tempInputStoreValue = '';
let inputDate = null;
let inputDateValue = '';
let tempInputDateValue = '';
let inputPrice = null;
let inputPriceValue = '';
let tempInputPriceValue = '';
let buttonAddShopping = null;
let tempIndex = -1;
let totalSumm = [];

window.onload = function() {
  inputStore = document.getElementById('shopping-store')
  inputStore.addEventListener('change', updateInputStoreValue)
  inputStore.addEventListener('keyup', keyupButtonAdd)
  inputDate = document.getElementById('shopping-date')
  inputDate.addEventListener('change', updateInputDateValue)
  inputDate.addEventListener('keyup', keyupButtonAdd)
  inputPrice = document.getElementById('shopping-price')
  inputPrice.addEventListener('change', updateInputPriceValue)
  inputPrice.addEventListener('keyup', keyupButtonAdd)
  buttonAddShopping = document.getElementById('shopping-add')
  buttonAddShopping.addEventListener('click', onClickButtonAdd)
}
const onClickButtonAdd = (index) => {
    allShoppingList.push({
      Store: inputStoreValue,
      Date: inputDateValue,
      Price: inputPriceValue,
      id: `id-${inputStoreValue}`,
      isChecked: false,
    })
    totalSumm.push(Number(inputPriceValue))
    
  inputStore.value = '';
  inputDateValue.value = '';
  inputPrice.value = '';
  render()
}
const keyupButtonAdd = (e) => {
  if (e.key === 'Enter') {
    onClickButtonAdd()
  }
}
const changeCheckboxValue = (index) => {
  allShoppingList[index].isChecked = !allShoppingList[index].isChecked
  render()
}
const clickImgEditShopping = (index) => {
  tempIndex = index
  render()
}
const clickImgDeleteShopping = (index) => {
  allShoppingList.splice(index, 1)
  totalSumm.splice(index, 1)
  render()
}
const changeInputEditStore = (event) => {
  tempInputStoreValue = event.target.value
 }
 const changeInputEditDate = (event) => {
  tempInputDateValue = event.target.value
 }
 const changeInputEditPrice = (event) => {
  tempInputPriceValue = event.target.value
 }
const clickImgDoneShopping = (index) => {
  allShoppingList[index].Store = tempInputStoreValue || allShoppingList[index].Store
  allShoppingList[index].Date = tempInputDateValue || allShoppingList[index].Date
  allShoppingList[index].Price = tempInputPriceValue || allShoppingList[index].Price
  totalSumm[index] = Number(tempInputPriceValue) || totalSumm[index]
  tempIndex = -1;
  render()
}
const clickImgCancelShopping = () => {
  tempIndex = -1;
  render()
}
const updateInputStoreValue = (event) => {
  inputStoreValue = event.target.value;
  render()
}
const updateInputDateValue = (event) => {
  inputDateValue = event.target.value
}
const updateInputPriceValue = (event) => {
  inputPriceValue = event.target.value
}

  
const render = () => {
  let shoppingList = document.getElementById('shopping-list')
  while(shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild)
  }
  let totalPrice = document.createElement('p')
  totalPrice.innerText = `Общая сумма покупок: ${totalSumm.reduce((a, b) => a + b)} руб.`
  shoppingList.appendChild(totalPrice)

  allShoppingList.sort((a, b) => a.isChecked - b.isChecked)

  allShoppingList.map((item, index) => {

    let cart = document.createElement('div')
    cart.className = 'allShoppingList'
    cart.id = `id-${index}`

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = item.isChecked
    checkbox.onclick = () => changeCheckboxValue(index)
    cart.appendChild(checkbox)

    if (tempIndex === index) {

      checkbox.disabled = true

      let inputEditStore = document.createElement('input')
      inputEditStore.type = 'text'
      inputEditStore.value = item.Store
      inputEditStore.onchange = (event) => changeInputEditStore(event)
      cart.appendChild(inputEditStore)
  
      let inputEditDate = document.createElement('input')
      inputEditDate.type = 'date'
      inputEditDate.value = item.Date
      inputEditDate.onchange = (event) => changeInputEditDate(event)
      cart.appendChild(inputEditDate)
  
      let inputEditPrice = document.createElement('input')
      inputEditPrice.type = 'number'
      inputEditPrice.value = item.Price
      inputEditPrice.onchange = (event) => changeInputEditPrice(event)
      cart.appendChild(inputEditPrice)

      let imgDoneShopping = document.createElement('img')
      imgDoneShopping.src = './img/done.jpeg'
      imgDoneShopping.alt = '#'
      imgDoneShopping.onclick = () => clickImgDoneShopping(index)
      cart.appendChild(imgDoneShopping)
  
      let imgCancelShopping = document.createElement('img')
      imgCancelShopping.src = './img/cancel.jpeg'
      imgCancelShopping.alt = '#'
      imgCancelShopping.onclick = () => clickImgCancelShopping(index)
      cart.appendChild(imgCancelShopping)

    } else {

      let paragrafStore = document.createElement('p')
      paragrafStore.innerText = `${index + 1}) Магазин: ` + item.Store
      cart.appendChild(paragrafStore)
  
      let paragrafDate = document.createElement('p')
      paragrafDate.innerText = item.Date
      cart.appendChild(paragrafDate)
  
      let paragrafPrice = document.createElement('p')
      paragrafPrice.innerText = item.Price + ' pуб.'
      cart.appendChild(paragrafPrice)

      let imgEditShopping = document.createElement('img')
      imgEditShopping.src = './img/edit.svg'
      imgEditShopping.alt = '#'
      imgEditShopping.onclick = () => clickImgEditShopping(index)
      cart.appendChild(imgEditShopping)
  
      let imgDeleteShopping = document.createElement('img')
      imgDeleteShopping.src = './img/delete.svg'
      imgDeleteShopping.alt = '#'
      imgDeleteShopping.onclick = () => clickImgDeleteShopping(index)
      cart.appendChild(imgDeleteShopping)
    }

    cart.className = 'cart-shopping'
    shoppingList.appendChild(cart)
  })

}

