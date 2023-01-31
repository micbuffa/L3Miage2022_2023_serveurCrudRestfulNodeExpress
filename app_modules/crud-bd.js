//let MongoClient = require('mongodb').MongoClient;
//let ObjectId = require('mongodb').ObjectID;

const { response } = require("express");

//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

exports.connexionBD = async () => {
	// On se connecte à la base de données, et on renvoie l'objet bd
	//let client = await MongoClient.connect(url, { useNewUrlParser: true });
	//let db = client.db(dbName);

	let db = "BD"; // pour le moment on simule la connexion

	return db;
}

exports.countRestaurants = async (name) => {
	//let client = await MongoClient.connect(url, { useNewUrlParser: true });
	//let db = client.db(dbName);
	let reponse;

	try {
		if (name == '') {
			reponse = restaurantsData.length;
		} else {
			// Restaurants dont le nom est égale à name
			// get number of restaurants whose name property = name
			let result = restaurantsData.data.filter(r => (r.name.includes(name)));
			return result.length;
		}
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "erreur lors du count"
		};
	} finally {
		//client.close();
		return reponse;
	}
};


exports.findRestaurants = async (page, pagesize, name) => {
	//let client = await MongoClient.connect(url, { useNewUrlParser: true });
	//let db = client.db(dbName);
	let reponse;

	let restaurants;
	let count;

	if (name == '') {
		restaurants = restaurantsData;
		count = restaurantsData.length;
	} else {
		console.log("Reçu requête avec pagination et nom : page = " + page + " pagesize = " + pagesize + " name = " + name);
		// Restaurants dont le nom est égale à name
		 restaurants = restaurantsData.filter(r => (r.name.includes(name)));
		// returns restaurants after index page*pagesize and before index (page+1)*pagesize
		restaurants = restaurants.slice(page * pagesize, (page + 1) * pagesize);

		count = restaurants.length;
	} 
		// On renvoie la réponse sous la forme d'une promesse (la fonction est async)
		reponse = {
			succes: true,
			msg: "restaurant recherchés avec succès",
			data: restaurants,
			count: count
		}
	return reponse;
};


exports.findRestaurantById = async (id) => {
	//let client = await MongoClient.connect(url, { useNewUrlParser: true });
	//let db = client.db(dbName);
	let reponse;

	//let myquery = { "_id": ObjectId(id) };

	//let data = await db.collection("restaurants").findOne(myquery);
	// get restaurant whose id = id
	let restaurant = restaurantsData.find(r => (r._id == id));

	if (restaurant.length != 0) {
		reponse = {
			succes: true,
			data: restaurant,
			error: null,
			msg: "Details du restaurant envoyés"
		};
	} else {
		reponse = {
			succes: false,
			data: null,
			error: err,
			msg: "erreur lors du find"
		};
	}
	return reponse;
}

exports.createRestaurant = async (formData) => {
	//let client = await MongoClient.connect(url, { useNewUrlParser: true });
	//let db = client.db(dbName);
	let reponse;

	try {
		let toInsert = {
			name: formData.nom,
			cuisine: formData.cuisine
		};
		//let data = await db.collection("restaurants").insertOne(toInsert);
		// generates random id for toInsert as int
		toInsert._id = Math.floor(Math.random() * 1000000000);

		// adds toInsert to restaurantsData
		restaurantsData.push(toInsert);

		reponse = {
			succes: true,
			result: toInsert._id,
			msg: "Ajout réussi " + toInsert._id
		};
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "erreur lors du insert"
		};
	} finally {
		//client.close();
		return reponse;
	}
}

exports.updateRestaurant = async (id, formData) => {
	//let client = await MongoClient.connect(url, { useNewUrlParser: true });
	//let db = client.db(dbName);
	let reponse;
	// Let's get restaurant whose id = id
	let restaurant = restaurantsData.find(r => (r._id == id));
	console.log("find by id restaurant = " + restaurant);
	if (!restaurant) {
		reponse = {
			succes: false,
			error: "Restaurant not found",
			msg: "Restaurant not found"
		};
	} else {
		// On met à jour le restaurant avec formData
		restaurant.name = formData.nom;
		restaurant.cuisine = formData.cuisine;

		reponse = {
			succes: true,
			result: restaurant,
			error: null,
			msg: `Modification réussie id=${restaurant._id} ${restaurant.name} ${restaurant.cuisine}`
		};
	}
	return reponse;
}

exports.deleteRestaurant = async function (id) {
	//let client = await MongoClient.connect(url, { useNewUrlParser: true });
	//let db = client.db(dbName);
	let reponse;

	try {
		// removes restaurant whose id = id
		restaurantsData = restaurantsData.filter(r => (r._id != id));

		reponse = {
			succes: true,
			result: id,
			error: null,
			msg: "Suppression réussie " + id
		};

	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "Problème à la suppression"
		};
	} finally {
		//client.close();
		return reponse;
	}
}

// donnees de test
var restaurantsData =
	[
		{
			"_id": "56b9f89be0adc7f00f348d02",
			"address": {
				"building": "103-05",
				"coord": [-73.8642349, 40.75356],
				"street": "37 Avenue",
				"zipcode": "11368"
			},
			"borough": "Queens",
			"cuisine": "Chinese",
			"grades": [
				{
					"date": "2014-04-21T00:00:00.000Z",
					"grade": "A",
					"score": 10
				},
				{
					"date": "2013-11-12T00:00:00.000Z",
					"grade": "A", "score": 5
				},
				{ "date": "2013-06-04T00:00:00.000Z", "grade": "A", "score": 12 },
				{ "date": "2012-11-14T00:00:00.000Z", "grade": "A", "score": 10 },
				{ "date": "2012-10-11T00:00:00.000Z", "grade": "P", "score": 0 },
				{ "date": "2012-05-24T00:00:00.000Z", "grade": "A", "score": 13 },
				{ "date": "2011-12-08T00:00:00.000Z", "grade": "A", "score": 12 },
				{ "date": "2011-07-20T00:00:00.000Z", "grade": "A", "score": 11 }
			],
			"name": "Ho Mei Restaurant",
			"restaurant_id": "40362432"
		},
		{
			"_id": "56b9f89be0adc7f00f348d03",
			"address": {
				"building": "56",
				"coord": [-73.991495, 40.692273],
				"street": "Court Street", "zipcode": "11201"
			},
			"borough": "Brooklyn",
			"cuisine": "Donuts",
			"grades": [
				{
					"date": "2014-12-30T00:00:00.000Z",
					"grade": "A", "score": 8
				},
				{
					"date": "2014-01-15T00:00:00.000Z",
					"grade": "A",
					"score": 9
				},
				{ "date": "2013-01-08T00:00:00.000Z", "grade": "A", "score": 11 },
				{ "date": "2012-01-19T00:00:00.000Z", "grade": "A", "score": 10 }
			],
			"name": "Dunkin' Donuts",
			"restaurant_id": "40363098"
		},
		{
			"_id": "56b9f89be0adc7f00f348d04",
			"address": {
				"building": "60",
				"coord": [-74.0085357, 40.70620539999999],
				"street": "Wall Street",
				"zipcode": "10005"
			},
			"borough": "Manhattan",
			"cuisine": "Turkish",
			"grades": [
				{ "date": "2014-09-26T00:00:00.000Z", "grade": "A", "score": 9 },
				{ "date": "2013-09-18T00:00:00.000Z", "grade": "A", "score": 13 },
				{ "date": "2012-09-21T00:00:00.000Z", "grade": "A", "score": 9 },
				{ "date": "2012-05-09T00:00:00.000Z", "grade": "A", "score": 11 }
			],
			"name": "The Country Cafe", "restaurant_id": "40362715"
		},
		{
			"_id": "56b9f89be0adc7f00f348d05",
			"address": {
				"building": "7905",
				"coord": [-73.8740217, 40.7135015],
				"street": "Metropolitan Avenue", "zipcode": "11379"
			}, "borough": "Queens", "cuisine": "Bagels/Pretzels", "grades": [{ "date": "2014-09-17T00:00:00.000Z", "grade": "A", "score": 10 }, { "date": "2014-01-16T00:00:00.000Z", "grade": "B", "score": 23 }, { "date": "2013-08-07T00:00:00.000Z", "grade": "A", "score": 10 }, { "date": "2013-02-21T00:00:00.000Z", "grade": "B", "score": 27 }, { "date": "2012-06-20T00:00:00.000Z", "grade": "B", "score": 27 }, { "date": "2012-01-31T00:00:00.000Z", "grade": "B", "score": 18 }], "name": "Hot Bagels", "restaurant_id": "40363565"
		}, { "_id": "56b9f89be0adc7f00f348d06", "address": { "building": "195", "coord": [-73.9246028, 40.6522396], "street": "East 56 Street", "zipcode": "11203" }, "borough": "Brooklyn", "cuisine": "Caribbean", "grades": [{ "date": "2014-05-13T00:00:00.000Z", "grade": "A", "score": 2 }, { "date": "2013-05-08T00:00:00.000Z", "grade": "A", "score": 7 }, { "date": "2012-09-22T00:00:00.000Z", "grade": "A", "score": 11 }, { "date": "2011-06-06T00:00:00.000Z", "grade": "A", "score": 12 }], "name": "Shashemene Int'L Restaura", "restaurant_id": "40362869" }, { "_id": "56b9f89be0adc7f00f348d07", "address": { "building": "87-69", "coord": [-73.8309503, 40.7001121], "street": "Lefferts Boulevard", "zipcode": "11418" }, "borough": "Queens", "cuisine": "American ", "grades": [{ "date": "2014-02-25T00:00:00.000Z", "grade": "A", "score": 7 }, { "date": "2013-08-14T00:00:00.000Z", "grade": "A", "score": 11 }, { "date": "2012-08-07T00:00:00.000Z", "grade": "A", "score": 7 }, { "date": "2012-03-26T00:00:00.000Z", "grade": "A", "score": 10 }, { "date": "2011-11-04T00:00:00.000Z", "grade": "A", "score": 0 }, { "date": "2011-06-29T00:00:00.000Z", "grade": "A", "score": 4 }], "name": "Snack Time Grill", "restaurant_id": "40363590" }, { "_id": "56b9f89be0adc7f00f348d08", "address": { "building": "1418", "coord": [-73.95685019999999, 40.7753401], "street": "Third Avenue", "zipcode": "10028" }, "borough": "Manhattan", "cuisine": "Continental", "grades": [{ "date": "2014-06-02T00:00:00.000Z", "grade": "A", "score": 9 }, { "date": "2013-12-27T00:00:00.000Z", "grade": "A", "score": 8 }, { "date": "2013-03-18T00:00:00.000Z", "grade": "B", "score": 26 }, { "date": "2012-02-01T00:00:00.000Z", "grade": "A", "score": 7 }, { "date": "2011-07-06T00:00:00.000Z", "grade": "B", "score": 25 }], "name": "Lorenzo & Maria'S", "restaurant_id": "40363630" }, { "_id": "56b9f89be0adc7f00f348d09", "address": { "building": "1031", "coord": [-73.9075537, 40.6438684], "street": "East 92 Street", "zipcode": "11236" }, "borough": "Brooklyn", "cuisine": "American ", "grades": [{ "date": "2014-02-05T00:00:00.000Z", "grade": "A", "score": 0 }, { "date": "2013-01-29T00:00:00.000Z", "grade": "A", "score": 3 }, { "date": "2011-12-08T00:00:00.000Z", "grade": "A", "score": 10 }], "name": "Sonny'S Heros", "restaurant_id": "40363744" }, { "_id": "56b9f89be0adc7f00f348d0a", "address": { "building": "405", "coord": [-73.97534999999999, 40.7516269], "street": "Lexington Avenue", "zipcode": "10174" }, "borough": "Manhattan", "cuisine": "Sandwiches/Salads/Mixed Buffet", "grades": [{ "date": "2014-02-21T00:00:00.000Z", "grade": "A", "score": 3 }, { "date": "2013-09-13T00:00:00.000Z", "grade": "A", "score": 3 }, { "date": "2012-08-28T00:00:00.000Z", "grade": "A", "score": 0 }, { "date": "2011-09-13T00:00:00.000Z", "grade": "A", "score": 12 }, { "date": "2011-05-03T00:00:00.000Z", "grade": "A", "score": 5 }], "name": "Lexler Deli", "restaurant_id": "40363426" }, { "_id": "56b9f89be0adc7f00f348d0b", "address": { "building": "148", "coord": [-73.9806854, 40.7778589], "street": "West 72 Street", "zipcode": "10023" }, "borough": "Manhattan", "cuisine": "Pizza", "grades": [{ "date": "2014-12-08T00:00:00.000Z", "grade": "A", "score": 13 }, { "date": "2014-05-05T00:00:00.000Z", "grade": "B", "score": 18 }, { "date": "2013-04-05T00:00:00.000Z", "grade": "A", "score": 13 }, { "date": "2012-03-30T00:00:00.000Z", "grade": "A", "score": 9 }], "name": "Domino'S Pizza", "restaurant_id": "40363945" }]







