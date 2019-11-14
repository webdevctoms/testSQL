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

module.exports = {router};