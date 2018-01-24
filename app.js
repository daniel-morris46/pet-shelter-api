var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');

const port = process.env.PORT || 8080;

Pet = require('./models/pet');

//Connect to db
var mongoDB = 'mongodb://daniel:daniel@ds111258.mlab.com:11258/pet_shelter_api';
mongoose.connect(mongoDB, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The Mongoose connection is ready');
    }
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator()); 


app.post('/api', function(req, res){



	var newPet = req.body;

	if(newPet.name == ""){
		newPet.name = "Unknown";
	}
	if(newPet.type == ""){
		newPet.type = "Unknown";
	}
	if(newPet.breed == ""){
		newPet.breed = "Unknown";
	}
	if(newPet.location == ""){
		newPet.location = "Unknown";
	}
	if(newPet.longitude == '' || newPet.longitude > 180 || newPet.longitude < -180){
		newPet.longitude = 0;
	}
	if(newPet.latitude == '' || newPet.latitude > 90 || newPet.latitude < -90){
		newPet.latitude = 0;
	}
	console.log(newPet);

	//console.log('Registered new pet ' + newPet.name + ' at lat: ' + newPet.latitude);

	Pet.addPet(newPet, function(err, newPet){
		if(err){
			throw err;
		}
		//res.redirect('https://daniels-pet-weather-app.herokuapp.com');
		res.json(newPet);
	});
});
app.get('/', function(req, res){
	res.redirect('/api');
});

app.get('/api', function(req, res){
	Pet.getPets(function(err, pets){
		if(err){
			throw err;
		}
		res.json(pets);
	});
});

app.get('/api/:_id', function(req, res){
	Pet.getPetById(req.params._id, function(err, pet){
		if(err){
			throw err;
		}
		res.json(pet);
	});
});




app.listen(port);
console.log('Running on port '+port+'....');