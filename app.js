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

// WHEN PAGE GETS LOADED THIS BLOCL OF CODE EXECUTES
app.get('/', (req, res) => {
	let value = {
		day: 'numeric',
		weekday: 'long',
		month: 'long'
	};
	const d = new Date();

	const todayDate = d.toLocaleDateString('en-US', value);

	res.render('list', { todayDay: todayDate, newItem: items });
});

// TO POST IT TO THE SERVER
app.post('/', (req, res) => {
	const name = req.body.name;
	items.push(name);
	res.redirect('/');
});

app.listen(3000, () => {
	console.log('running on port 3000');
});
