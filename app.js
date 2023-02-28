const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// INCLUDE BODY PARSER TO OUR CODE
app.use(bodyParser.urlencoded({ extended: true }));

// INCLUDE EJS TO OUR EXPRESS APP
app.set('view engine', 'ejs');

// USE STATIC FILES INSIDE OUR EXPRESS APP
app.use(express.static('public'));

// THE ITEM ARRAY THIS IS FOR WHEN THE USER ADDED NEW ITEM TO THE LIST
let items = [];

// FOR WORK REALTED ITEMS TO BE ADDED
let workList = [];

// WHEN PAGE GETS LOADED THIS BLOCL OF CODE EXECUTES
app.get('/', (req, res) => {
	let value = {
		day: 'numeric',
		weekday: 'long',
		month: 'long'
	};
	const d = new Date();

	const todayDate = d.toLocaleDateString('en-US', value);

	res.render('list', { mainHeading: todayDate, newItem: items });
});

// TO POST IT TO THE SERVER
app.post('/', (req, res) => {
	const list = req.body.list;

	// TO CHECK THE TYPE OF LIST SO THAT I CAN DECIDE IT BELONGS TO THE HOME ROUTE OR /work ROUTE
	if (list === 'Work List') {
		const name = req.body.name;
		workList.push(name);
		res.redirect('/work');
	} else {
		const name = req.body.name;
		items.push(name);
		res.redirect('/');
	}
});

// MAKE WORK ROUTE SO THAT THE USER CAN LIST THEIR WORK ACCORDINGLY

app.get('/work', (req, res) => {
	// HERE LIST IS THE PAGE NAME IN THIS CONTEXT list.ejs
	res.render('list', { mainHeading: 'Work List', newItem: workList });
});

app.post('/work', (req, res) => {
	const name = req.body.name;
	workList.push(name);
	res.redirect('/work');
});

app.listen(3000, () => {
	console.log('running on port 3000');
});
