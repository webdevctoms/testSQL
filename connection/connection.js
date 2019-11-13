const mysql = require('mysql');
const {user,pass} = require('../config');
const {createTableQuery} = require('./dbUtil');

const pool = mysql.createPool({
	host: "localhost",
	user: user,
	password: pass,
	connectionLimit: 10,
  database:'test'
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection){
  	console.log('connected');
  	connection.release();	
  } 
  console.log('finished getting connection',err);
  return;
});

pool.createDb = (dbName) => {
  let promise = new Promise((resolve,reject) => {
    let q = 'CREATE DATABASE ' + dbName;
    pool.query(q,function(err,result){
      if(err){
        console.log('error',err);
        //connection.release();
        reject(err);
      }
      else{
        console.log('created db');
        resolve('db created');
      }
    })
  });

  return promise;
};

pool.createTable = (tableName,queryData) => {
  let queryString = createTableQuery(queryData);
  let query = 'CREATE TABLE ' + tableName + ' (id INT AUTO_INCREMENT,';
};

module.exports = {pool};