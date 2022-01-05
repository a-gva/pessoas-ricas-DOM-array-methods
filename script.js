const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

getRandomUser()
getRandomUser()
getRandomUser()
getRandomUser()
getRandomUser()

// Fetch random user and add money
async function getRandomUser () {
  const res = await fetch('https://randomuser.me/api/')
  const data = await res.json()

  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1500000)
  }

  addData(newUser)
}

// Function Double Money
function doubleMoney () {
  data = data.map(user => {
    return { ...user, money: user.money * 2 }
  })
  updateDOM()
}

// Sort Users by Richest
function sortByRichest () {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

// Show only millionaires
function showMillionaires () {
  data = data.filter(user => user.money > 1000000)
  updateDOM()
}

// Calculate total Wealth
function calculateWealth () {
  const total = data.reduce((acc, user) => acc + user.money, 0)
  console.log(formatMoney(total))

  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total: <strong>${formatMoney(total)}</strong></h3>`
  main.appendChild(wealthEl)
}

// Add new object to data array
function addData (obj) {
  data.push(obj)
  updateDOM()
}

// Update DOM
function updateDOM (providedData = data) {
  // Clear Main div
  main.innerHTML = '<h2><strong>Pessoa</strong>Fortuna</h2>'

  providedData.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`
    main.appendChild(element)
  })
}

// Format number as money

function formatMoney (number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') // 12,345.67
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillionairesBtn.addEventListener('click', showMillionaires)
sortBtn.addEventListener('click', sortByRichest)
calculateWealthBtn.addEventListener('click', calculateWealth)
