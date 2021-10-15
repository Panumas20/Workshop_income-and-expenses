const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dataTransaction = [];
let transactions = dataTransaction;

function init() {
	list.innerHTML = '';
	transactions.forEach(addDataToList);
	calculateMoney();
}
function addDataToList(transactions) {
	const symbol = transactions.amount < 0 ? '-' : '+';
	const status = transactions.amount < 0 ? 'minus' : 'plus';
	const item = document.createElement('li');
	const num = numberWithCommas(Math.abs(transactions.amount));

	item.classList.add(status);
	item.innerHTML = `${transactions.text}<span>${symbol}${num}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
	list.appendChild(item);
}
function addTransactions(e) {
	e.preventDefault();
	console.log('send_data');
	if (text.value.trim() === '' || amount.value.trim() === '') {
		alert('กรุณาป้อนข้อมูลให้ครบ');
	} else {
		console.log(typeof text.value);
		console.log(typeof +amount.value);
		console.log(autoID());
		const data = {
			id: autoID(),
			text: text.value,
			amount: +amount.value,
		};
		transactions.push(data);
		addDataToList(data);
		calculateMoney();

		text.value = '';
		amount.value = '';
	}
}

function calculateMoney() {
	const amounts = transactions.map((transactions) => transactions.amount);
	//คำนวนยอดคงเหลือ
	const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);
	//คำนวนรายรับ
	const income = amounts
		.filter((item) => item > 0) //ค้นหาข้อมูลใน amount ที่มีค่ามากกว่า 0
		.reduce((result, item) => (result += item), 0)
		.toFixed(2);

	//คำนวนรายจ่าย
	const expense = (
		amounts
			.filter((item) => item < 0) //ค้นหาข้อมูลใน amount ที่มีค่าน้อยกว่า 0
			.reduce((result, item) => (result += item), 0) * -1
	).toFixed(2);

	//แสดงผลทางจอภาพ
	balance.innerText = `฿` + numberWithCommas(total); //`฿ ${total}`;
	money_plus.innerText = `฿` + numberWithCommas(income); //`฿ ${income}`;
	money_minus.innerText = `฿` + numberWithCommas(expense); //`฿ ${expense}`;
	console.log(typeof income);
	console.log(typeof expense);
}

function removeData(id) {
	transactions = transactions.filter((transactions) => transactions.id !== id);
	console.log('delete', id);
	init();
}

function autoID() {
	return Math.floor(Math.random() * 1000000);
}
function numberWithCommas(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
form.addEventListener('submit', addTransactions);

init();
