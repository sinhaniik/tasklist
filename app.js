const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://127.0.0.1:27017/taskDB' ,
  { useNewUrlParser: true , useUnifiedTopology: true } );


const app = express();
const { Schema } = mongoose;

const taskSchema = new Schema( {
	name: String
} );

const Task = mongoose.model( 'Task' , taskSchema );

// INCLUDE BODY PARSER TO OUR CODE
app.use(bodyParser.urlencoded({ extended: true }));

// INCLUDE EJS TO OUR EXPRESS APP
app.set('view engine', 'ejs');

// USE STATIC FILES INSIDE OUR EXPRESS APP
app.use(express.static('public'));

// FOR WORK RELATED ITEMS TO BE ADDED
let workList = [];

const task1 = new Task( {
	name: 'eat' ,
} );

const task2 = new Task( {
	name: 'sleep' ,
} );

const task3 = new Task( {
	name: 'work' ,
} );

let task = [ task1 , task2 , task3 ];
// ;
// WHEN PAGE GETS LOADED THIS BLOCK OF CODE EXECUTES
app.get( '/' , ( req , res ) => {
	const dataRead = async () => {
		const dataFind = await Task.find( {} );
		console.log( dataFind );
		res.render( 'list' , { mainHeading: 'Today' , newItem: dataFind } );
	};
	dataRead();
} );


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
