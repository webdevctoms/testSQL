const express = require("express");
const router = express.Router();
const {pool} = require('../connection/connection');

router.post('/',(req,res)=>{
	let {columns,tableName} = req.body;
	console.log(tableName);
	console.log(columns);

	return pool.createTable(tableName,columns)

	.then(message => {
		return res.send({
			status:200,
			message
		})
	})

	.catch(err => {
		console.log(err);
		return res.send({
			status:500,
			message:'error creating table'
		})
	});
});

router.post('/add-users',(req,res)=>{
	let {amount,tableName} = req.body;
	console.log(amount,tableName);
	return pool.populateTable(tableName,amount)

	.then(message => {
		return res.send({
			status:200,
			message
		})
	})

	.catch(err => {
		console.log(err);
		return res.send({
			status:500,
			message:'error creating users'
		})
	});
});

router.get('/all',(req,res)=>{
	let {columns,tableName} = req.body;
	console.log(columns,tableName);
	return pool.getAll(tableName,columns)

	.then(message => {
		return res.send({
			status:200,
			message
		})
	})

	.catch(err => {
		console.log(err);
		return res.send({
			status:500,
			message:'error creating users'
		})
	});
});

module.exports = {router};