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
		
		if ( task.length === 0 ) {
			task.insertMany( task );
		} else {
			const dataFind = await Task.find( {} );
			res.render( 'list' , { mainHeading: 'Today' , newItem: dataFind } );
		}
		
	};
	dataRead();
} );


// TO POST IT TO THE SERVER
app.post('/', (req, res) => {
	const list = new Task({
		name : req.body.name
	});
	
	list.save()
	res.redirect("/")
});

app.post("/del" , (res,req) => {
	// const delItem = req.body
	//
	// console.log(delItem)
})

app.listen(3000, () => {
	console.log('running on port 3000');
});
