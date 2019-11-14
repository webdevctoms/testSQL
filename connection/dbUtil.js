const Faker = require('faker');

function createTableQuery(queryData){
	let queryString = "";

	for(let i = 0;i < queryData.length;i++){
		let columnName = queryData[i].columnName;
		let dataType = queryData[i].dataType;
		let dataValue = queryData[i].dataValue ? '(' + queryData[i].dataValue  + ')': "";
		queryString += ' ' + columnName + ' ' + dataType + dataValue + ',';
	}

	return queryString;
}

function createColumnQuery(queryData){
	let queryString = "";

	for(let i = 0;i < queryData.length;i++){
		queryString += queryData[i] + ',';
	}

	return queryString.slice(0,-1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createUser(){
	let user = [];
	//console.log(Faker);
	//first name
	user.push(Faker.name.firstName());
	//last name
	user.push(Faker.name.lastName());
	//email
	user.push(Faker.internet.email());
	//password
	user.push(Faker.address.zipCode());
	//location
	user.push(Faker.address.city());
	//dept
	user.push(Faker.random.word('noun'));
	//is_admin
	user.push(getRandomInt(2));
	//registered date
	user.push(Faker.date.past());
	console.log(user);
	return user;
}

module.exports = {createTableQuery,createUser,createColumnQuery};