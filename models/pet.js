var mongoose = require('mongoose');

//Pet Schema
var petSchema = mongoose.Schema({
	name:{
		type:String,
	},
	type:{
		type:String
	},
	breed:{
		type:String
	},
	location:{
		type:String
	},
	latitude:{
		type:Number
	},
	longitude:{
		type:Number
	}
});

var Pet = module.exports = mongoose.model('Pet', petSchema);

module.exports.getPets = function(callback, limit){
	Pet.find(callback).limit(limit);
}

module.exports.getPetById = function(id, callback){
	Pet.findById(id, callback);
}

module.exports.addPet = function(pet, callback){
	Pet.create(pet, callback);
}